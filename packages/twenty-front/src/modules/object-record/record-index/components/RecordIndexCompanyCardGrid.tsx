import { useObjectPermissionsForObject } from '@/object-record/hooks/useObjectPermissionsForObject';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useRelevantRecordsGqlFields } from '@/object-record/record-field/hooks/useRelevantRecordsGqlFields';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useFindManyRecordIndexTableParams } from '@/object-record/record-index/hooks/useFindManyRecordIndexTableParams';
import { useOpenRecordFromIndexView } from '@/object-record/record-index/hooks/useOpenRecordFromIndexView';
import { useCreateNewIndexRecord } from '@/object-record/record-table/hooks/useCreateNewIndexRecord';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { type KeyboardEvent, useContext } from 'react';
import { isNonEmptyString } from '@sniptt/guards';
import { IconMap, IconPlus, IconUsers } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { beautifyPastDateRelativeToNow } from '~/utils/date-utils';

type TagColor = 'blue' | 'orange' | 'green' | 'purple' | 'pink' | 'turquoise';

const LOGO_TILE_COLORS: TagColor[] = [
  'blue',
  'orange',
  'green',
  'purple',
  'pink',
  'turquoise',
];

const StyledGridContainer = styled.div`
  background-color: ${themeCssVariables.background.secondary};
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: ${themeCssVariables.spacing[4]};
  width: 100%;
`;

const StyledGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const StyledCard = styled.div`
  background-color: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  box-shadow: ${themeCssVariables.boxShadow.light};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  min-width: 0;
  padding: ${themeCssVariables.spacing[3]};

  &:hover {
    background-color: ${themeCssVariables.background.secondary};
  }

  &:focus-visible {
    border-color: ${themeCssVariables.border.color.blue};
    outline: none;
  }
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledLogoTile = styled.div<{ tagColor: TagColor }>`
  align-items: center;
  background-color: ${({ tagColor }) =>
    themeCssVariables.tag.background[tagColor]};
  border-radius: ${themeCssVariables.border.radius.sm};
  box-sizing: border-box;
  color: ${({ tagColor }) => themeCssVariables.tag.text[tagColor]};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  height: ${themeCssVariables.spacing[8]};
  justify-content: center;
  width: ${themeCssVariables.spacing[8]};
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const StyledName = styled.span`
  font-weight: ${themeCssVariables.font.weight.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDomain = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledFieldsGrid = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-top: ${themeCssVariables.spacing[3]};
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledFieldLabel = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledFieldValue = styled.span`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledFieldIcon = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
`;

const StyledOwner = styled.span`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
  white-space: nowrap;
`;

const StyledOwnerAvatar = styled.span`
  align-items: center;
  background-color: ${themeCssVariables.tag.background.lime};
  border-radius: ${themeCssVariables.border.radius.rounded};
  box-sizing: border-box;
  color: ${themeCssVariables.tag.text.lime};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.xxs};
  font-weight: ${themeCssVariables.font.weight.medium};
  height: ${themeCssVariables.spacing[4]};
  justify-content: center;
  width: ${themeCssVariables.spacing[4]};
`;

const StyledLinkChip = styled.span`
  align-items: center;
  background-color: ${themeCssVariables.background.transparent.light};
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.pill};
  box-sizing: border-box;
  display: flex;
  height: ${themeCssVariables.spacing[5]};
  max-width: 100%;
  overflow: hidden;
  padding: 0 ${themeCssVariables.spacing[2]};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledAddNewTile = styled.button`
  align-items: center;
  background: none;
  border: 1px dashed ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.md};
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: center;
  min-height: ${themeCssVariables.spacing[32]};

  &:hover {
    background-color: ${themeCssVariables.background.transparent.lighter};
  }
`;

type CompanyCardRecord = ObjectRecord & {
  name?: string | null;
  domainName?: { primaryLinkUrl?: string | null } | string | null;
  employees?: number | null;
  address?: { addressCity?: string | null } | null;
  accountOwner?: {
    name?: { firstName?: string | null; lastName?: string | null } | null;
  } | null;
  linkedinLink?: { primaryLinkUrl?: string | null } | null;
  createdBy?: { name?: string | null } | null;
  createdAt?: string | null;
};

const getDisplayedDomain = (domainName: CompanyCardRecord['domainName']) => {
  const rawDomain =
    typeof domainName === 'string' ? domainName : domainName?.primaryLinkUrl;

  if (!isNonEmptyString(rawDomain)) {
    return '';
  }

  return rawDomain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
};

const getLinkedinSlug = (linkedinLink: CompanyCardRecord['linkedinLink']) => {
  const rawUrl = linkedinLink?.primaryLinkUrl;

  if (!isNonEmptyString(rawUrl)) {
    return '';
  }

  const pathSegments = rawUrl.replace(/\/$/, '').split('/');

  return pathSegments[pathSegments.length - 1] ?? '';
};

const getLogoTileColor = (name: string): TagColor => {
  const charCodeSum = Array.from(name).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  return LOGO_TILE_COLORS[charCodeSum % LOGO_TILE_COLORS.length];
};

export const RecordIndexCompanyCardGrid = () => {
  const { theme } = useContext(ThemeContext);
  const { objectNameSingular, objectMetadataItem } =
    useRecordIndexContextOrThrow();

  const findManyParams = useFindManyRecordIndexTableParams(objectNameSingular);
  const recordGqlFields = useRelevantRecordsGqlFields({ objectMetadataItem });

  const { records } = useFindManyRecords<CompanyCardRecord>({
    ...findManyParams,
    recordGqlFields,
  });

  const { openRecordFromIndexView } = useOpenRecordFromIndexView();

  const { createNewIndexRecord } = useCreateNewIndexRecord({
    objectMetadataItem,
  });

  const objectPermissions = useObjectPermissionsForObject(
    objectMetadataItem.id,
  );

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    recordId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openRecordFromIndexView({ recordId });
    }
  };

  return (
    <StyledGridContainer>
      <StyledGrid>
        {records.map((record) => {
          const name = record.name ?? '';
          const domain = getDisplayedDomain(record.domainName);
          const ownerFirstName = record.accountOwner?.name?.firstName ?? '';
          const ownerFullName = [
            ownerFirstName,
            record.accountOwner?.name?.lastName ?? '',
          ]
            .filter(isNonEmptyString)
            .join(' ');
          const linkedinSlug = getLinkedinSlug(record.linkedinLink);

          return (
            <StyledCard
              key={record.id}
              role="button"
              tabIndex={0}
              onClick={() => openRecordFromIndexView({ recordId: record.id })}
              onKeyDown={(event) => handleCardKeyDown(event, record.id)}
            >
              <StyledCardHeader>
                <StyledLogoTile tagColor={getLogoTileColor(name)}>
                  {name.charAt(0)}
                </StyledLogoTile>
                <StyledTitleContainer>
                  <StyledName>{name}</StyledName>
                  <StyledDomain>{domain}</StyledDomain>
                </StyledTitleContainer>
              </StyledCardHeader>
              <StyledFieldsGrid>
                <StyledField>
                  <StyledFieldLabel>{t`Employees`}</StyledFieldLabel>
                  <StyledFieldValue>
                    <StyledFieldIcon>
                      <IconUsers size={theme.icon.size.sm} />
                    </StyledFieldIcon>
                    {record.employees?.toLocaleString('en-US')}
                  </StyledFieldValue>
                </StyledField>
                <StyledField>
                  <StyledFieldLabel>{t`Address`}</StyledFieldLabel>
                  <StyledFieldValue>
                    <StyledFieldIcon>
                      <IconMap size={theme.icon.size.sm} />
                    </StyledFieldIcon>
                    {record.address?.addressCity}
                  </StyledFieldValue>
                </StyledField>
                <StyledField>
                  <StyledFieldLabel>{t`Account Owner`}</StyledFieldLabel>
                  <StyledFieldValue>
                    {isNonEmptyString(ownerFullName) && (
                      <StyledOwner>
                        <StyledOwnerAvatar>
                          {ownerFirstName.charAt(0)}
                        </StyledOwnerAvatar>
                        {ownerFullName}
                      </StyledOwner>
                    )}
                  </StyledFieldValue>
                </StyledField>
                <StyledField>
                  <StyledFieldLabel>{t`Linkedin`}</StyledFieldLabel>
                  <StyledFieldValue>
                    {isNonEmptyString(linkedinSlug) && (
                      <StyledLinkChip>{linkedinSlug}</StyledLinkChip>
                    )}
                  </StyledFieldValue>
                </StyledField>
              </StyledFieldsGrid>
              <StyledFieldLabel>
                {t`Created by`} {record.createdBy?.name}
                {isNonEmptyString(record.createdAt) &&
                  ` · ${beautifyPastDateRelativeToNow(record.createdAt)}`}
              </StyledFieldLabel>
            </StyledCard>
          );
        })}
        {objectPermissions.canUpdateObjectRecords && (
          <StyledAddNewTile
            type="button"
            onClick={() => createNewIndexRecord({ position: 'last' })}
          >
            <IconPlus size={theme.icon.size.md} />
            {t`Add New`}
          </StyledAddNewTile>
        )}
      </StyledGrid>
    </StyledGridContainer>
  );
};
