import { Trans, useLingui } from '@lingui/react/macro';
import { styled } from '@linaria/react';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useRedirectToDefaultDomain } from '@/domain-manager/hooks/useRedirectToDefaultDomain';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useModal } from '@/ui/layout/modal/hooks/useModal';
import { isDefined } from 'twenty-shared/utils';
import { H2Title, IconTrash } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { useMutation } from '@apollo/client/react';
import { DeleteCurrentWorkspaceDocument } from '~/generated-metadata/graphql';

const DELETE_WORKSPACE_MODAL_ID = 'delete-workspace-modal';

const StyledDangerZone = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.medium};
  padding-top: ${themeCssVariables.spacing[8]};
`;

const StyledDangerTitle = styled(H2Title)`
  h2 {
    color: ${themeCssVariables.font.color.danger};
  }
`;

const StyledDeleteRow = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.transparent.danger};
  border: 1px solid ${themeCssVariables.border.color.danger};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  gap: ${themeCssVariables.spacing[4]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledDeleteRowText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDeleteRowTitle = styled.span`
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledDeleteRowDescription = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

export const DeleteWorkspace = () => {
  const [deleteCurrentWorkspace] = useMutation(DeleteCurrentWorkspaceDocument);
  const currentUser = useAtomStateValue(currentUserState);
  const userEmail = currentUser?.email;
  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const workspaceName = currentWorkspace?.displayName;
  const { t } = useLingui();
  const { openModal } = useModal();

  const { signOut } = useAuth();
  const { redirectToDefaultDomain } = useRedirectToDefaultDomain();

  const deleteWorkspace = async () => {
    await deleteCurrentWorkspace();
    await signOut();
    redirectToDefaultDomain();
  };

  return (
    <>
      <StyledDangerZone>
        <StyledDangerTitle
          title={t`Danger zone`}
          description={t`Deleting this workspace permanently removes all its data, members and settings. This action cannot be undone.`}
        />
        <StyledDeleteRow>
          <StyledDeleteRowText>
            <StyledDeleteRowTitle>{t`Delete workspace`}</StyledDeleteRowTitle>
            <StyledDeleteRowDescription>
              {isDefined(workspaceName)
                ? t`${workspaceName} and everything in it will be erased.`
                : t`Everything in this workspace will be erased.`}
            </StyledDeleteRowDescription>
          </StyledDeleteRowText>
          <Button
            accent="danger"
            variant="secondary"
            size="small"
            title={t`Delete workspace`}
            Icon={IconTrash}
            onClick={() => openModal(DELETE_WORKSPACE_MODAL_ID)}
          />
        </StyledDeleteRow>
      </StyledDangerZone>

      <ConfirmationModal
        modalInstanceId={DELETE_WORKSPACE_MODAL_ID}
        confirmationPlaceholder={userEmail}
        confirmationValue={userEmail}
        title={t`Workspace Deletion`}
        subtitle={
          <Trans>
            This action cannot be undone. This will permanently delete your
            entire workspace. <br /> Please type in your email to confirm.
          </Trans>
        }
        onConfirmClick={deleteWorkspace}
        confirmButtonText={t`Delete workspace`}
      />
    </>
  );
};
