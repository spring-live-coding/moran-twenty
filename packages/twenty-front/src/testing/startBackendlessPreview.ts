import { graphql, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

import { tokenPairState } from '@/auth/states/tokenPairState';
import { jotaiStore } from '@/ui/utilities/state/jotai/jotaiStore';
import { REACT_APP_SERVER_BASE_URL } from '~/config';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedClientConfig } from '~/testing/mock-data/config';
import { mockedPublicWorkspaceDataBySubdomain } from '~/testing/mock-data/publicWorkspaceDataBySubdomain';
import { mockedUserData } from '~/testing/mock-data/users';
import { mockedCompanyRecords } from '~/testing/mock-data/generated/data/companies/mock-companies-data';
import { mockedPersonRecords } from '~/testing/mock-data/generated/data/people/mock-people-data';
import { mockedViews } from '~/testing/mock-data/generated/metadata/views/mock-views-data';
import { mockedNavigationMenuItems } from '~/testing/mock-data/generated/metadata/navigation-menu-items/mock-navigation-menu-items-data';
import { mockedStandardObjectMetadataQueryResult } from '~/testing/mock-data/generated/metadata/objects/mock-objects-metadata';

const objectMetadataIds = new Set(
  mockedStandardObjectMetadataQueryResult.objects.edges.map(
    ({ node }) => node.id,
  ),
);

const previewViews = mockedViews
  .filter((view) => objectMetadataIds.has(view.objectMetadataId))
  .map((view) => ({
    ...view,
    __typename: 'View',
    viewFields: view.viewFields.map((field) => ({
      ...field,
      __typename: 'ViewField',
      isActive: true,
      viewFieldGroupId: null,
    })),
    viewFieldGroups: (view.viewFieldGroups ?? []).map((group) => ({
      ...group,
      __typename: 'ViewFieldGroup',
      isActive: true,
    })),
    viewFilters: view.viewFilters.map((filter) => ({
      ...filter,
      __typename: 'ViewFilter',
    })),
    viewFilterGroups: (view.viewFilterGroups ?? []).map((group) => ({
      ...group,
      __typename: 'ViewFilterGroup',
    })),
    viewSorts: view.viewSorts.map((sort) => ({
      ...sort,
      __typename: 'ViewSort',
    })),
    viewGroups: view.viewGroups.map((group) => ({
      ...group,
      __typename: 'ViewGroup',
    })),
  }));

export const startBackendlessPreview = async () => {
  const workspaceUrls = {
    customUrl: null,
    subdomainUrl: window.location.origin,
  };
  const worker = setupWorker(
    graphql.query('FindOneWorkspaceMember', () =>
      HttpResponse.json({
        data: { workspaceMember: mockedUserData.workspaceMember },
      }),
    ),
    ...['FindAllViews', 'FindFieldsWidgetViews', 'FindTableWidgetViews'].map(
      (operation) =>
        graphql.query(operation, ({ variables }) =>
          HttpResponse.json({
            data: {
              getViews: previewViews.filter(
                (view) =>
                  !Array.isArray(variables.viewTypes) ||
                  variables.viewTypes.includes(view.type),
              ),
            },
          }),
        ),
    ),
    graphql.query('FindManyNavigationMenuItems', () =>
      HttpResponse.json({
        data: {
          navigationMenuItems: mockedNavigationMenuItems.map((item) => ({
            ...item,
            __typename: 'NavigationMenuItem',
            type:
              item.type ??
              (item.targetRecordId
                ? 'RECORD'
                : item.viewId
                  ? 'VIEW'
                  : item.targetObjectMetadataId
                    ? 'OBJECT'
                    : item.link
                      ? 'LINK'
                      : 'FOLDER'),
            pageLayoutId: null,
          })),
        },
      }),
    ),
    graphql.mutation('AddQueryToEventStream', () =>
      HttpResponse.json({ data: { addQueryToEventStream: true } }),
    ),
    graphql.mutation('RemoveQueryFromEventStream', () =>
      HttpResponse.json({ data: { removeQueryFromEventStream: true } }),
    ),
    graphql.query('MyConnectedAccounts', () =>
      HttpResponse.json({ data: { myConnectedAccounts: [] } }),
    ),
    graphql.query('MyMessageChannels', () =>
      HttpResponse.json({ data: { myMessageChannels: [] } }),
    ),
    graphql.query('MyCalendarChannels', () =>
      HttpResponse.json({ data: { myCalendarChannels: [] } }),
    ),
    graphql.query('AggregateCompanies', () =>
      HttpResponse.json({
        data: { companies: { totalCount: mockedCompanyRecords.length } },
      }),
    ),
    graphql.query('AggregatePeople', () =>
      HttpResponse.json({
        data: { people: { totalCount: mockedPersonRecords.length } },
      }),
    ),
    graphql.mutation('TrackAnalytics', () =>
      HttpResponse.json({ data: { trackAnalytics: { success: true } } }),
    ),
    http.post(`${REACT_APP_SERVER_BASE_URL}/metadata`, async ({ request }) => {
      const body = (await request.clone().json()) as {
        query?: string;
        variables?: { eventStreamId?: string };
      };
      if (!body.query?.includes('subscription OnEventSubscription')) return;
      return new HttpResponse(
        new ReadableStream({
          start(controller) {
            const data = {
              data: {
                onEventSubscription: {
                  eventStreamId: body.variables?.eventStreamId,
                  objectRecordEventsWithQueryIds: [],
                  metadataEvents: [],
                },
              },
            };
            controller.enqueue(
              new TextEncoder().encode(
                `event: next\ndata: ${JSON.stringify(data)}\n\n`,
              ),
            );
          },
        }),
        { headers: { 'Content-Type': 'text/event-stream' } },
      );
    }),
    graphql.query('FindManyFrontComponents', () =>
      HttpResponse.json({
        data: { frontComponents: [] },
      }),
    ),
    graphql.query('GetCurrentUser', () =>
      HttpResponse.json({
        data: {
          currentUser: {
            ...mockedUserData,
            currentUserWorkspace: {
              ...mockedUserData.currentUserWorkspace,
              id: 'spring-preview-user-workspace',
              objectsPermissions:
                mockedUserData.currentUserWorkspace.objectsPermissions.map(
                  (permission) => ({
                    ...permission,
                    __typename: 'ObjectPermission',
                  }),
                ),
            },
            currentWorkspace: {
              ...mockedUserData.currentWorkspace,
              workspaceUrls,
            },
            workspaces: [
              {
                workspace: {
                  ...mockedUserData.currentWorkspace,
                  workspaceUrls,
                },
              },
            ],
          },
        },
      }),
    ),
    graphql.query('GetPublicWorkspaceDataByDomain', () =>
      HttpResponse.json({
        data: {
          getPublicWorkspaceDataByDomain: {
            ...mockedPublicWorkspaceDataBySubdomain,
            workspaceUrls,
            logo: null,
          },
        },
      }),
    ),
    http.get(`${REACT_APP_SERVER_BASE_URL}/client-config`, () =>
      HttpResponse.json({
        ...mockedClientConfig,
        frontDomain: window.location.hostname,
        analyticsEnabled: false,
        sentry: null,
        captcha: null,
        billing: { ...mockedClientConfig.billing, isBillingEnabled: false },
        allowRequestsToTwentyIcons: false,
      }),
    ),
    ...graphqlMocks.handlers,
    http.all(`${REACT_APP_SERVER_BASE_URL}/*`, ({ request }) =>
      HttpResponse.json(
        { errors: [{ message: `Preview fixture missing for ${request.url}` }] },
        { status: 501 },
      ),
    ),
  );

  await worker.start({ onUnhandledRequest: 'bypass', quiet: true });

  const expiresAt = new Date(Date.now() + 86_400_000).toISOString();
  const payload = btoa(
    JSON.stringify({
      sub: mockedUserData.id,
      workspaceId: mockedUserData.currentWorkspace.id,
      type: 'ACCESS',
      exp: Math.floor(Date.now() / 1000) + 86_400,
    }),
  ).replace(/=+$/, '');
  const token = `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.${payload}.preview`;
  jotaiStore.set(tokenPairState.atom, {
    accessOrWorkspaceAgnosticToken: { token, expiresAt },
    refreshToken: { token, expiresAt },
  });
};
