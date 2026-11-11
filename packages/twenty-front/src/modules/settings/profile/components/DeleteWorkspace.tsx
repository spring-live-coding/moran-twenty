import { Trans, useLingui } from '@lingui/react/macro';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useRedirectToDefaultDomain } from '@/domain-manager/hooks/useRedirectToDefaultDomain';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useModal } from '@/ui/layout/modal/hooks/useModal';
import { H2Title, IconTrash } from 'twenty-ui/display';
import { styled } from '@linaria/react';
import { Button } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { useMutation } from '@apollo/client/react';
import { DeleteCurrentWorkspaceDocument } from '~/generated-metadata/graphql';

const DELETE_WORKSPACE_MODAL_ID = 'delete-workspace-modal';

const StyledCard = styled.div`
  align-items: center;
  background-color: ${themeCssVariables.background.danger};
  border: 1px solid ${themeCssVariables.border.color.danger};
  border-radius: ${themeCssVariables.border.radius.md};
  box-sizing: border-box;
  display: flex;
  gap: ${themeCssVariables.spacing[4]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledCardTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledCardDescription = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

export const DeleteWorkspace = () => {
  const [deleteCurrentWorkspace] = useMutation(DeleteCurrentWorkspaceDocument);
  const currentUser = useAtomStateValue(currentUserState);
  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const userEmail = currentUser?.email;
  const { t } = useLingui();
  const workspaceName = currentWorkspace?.displayName ?? t`This workspace`;
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
      <H2Title
        title={t`Danger zone`}
        description={t`Deleting this workspace permanently removes all its data. This cannot be undone.`}
      />
      <StyledCard>
        <StyledCardText>
          <StyledCardTitle>{t`Delete workspace`}</StyledCardTitle>
          <StyledCardDescription>
            {t`${workspaceName} and all of its records will be erased.`}
          </StyledCardDescription>
        </StyledCardText>
        <Button
          accent="danger"
          variant="primary"
          title={t`Delete workspace`}
          Icon={IconTrash}
          onClick={() => openModal(DELETE_WORKSPACE_MODAL_ID)}
        />
      </StyledCard>

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
