import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { isMultiWorkspaceEnabledState } from '@/client-config/states/isMultiWorkspaceEnabledState';
import { domainConfigurationState } from '@/domain-manager/states/domainConfigurationState';
import {
  SUBDOMAIN_CHANGE_CONFIRMATION_MODAL_ID,
  useSettingsSubdomain,
} from '@/settings/domains/hooks/useSettingsSubdomain';
import { SettingsTextInput } from '@/ui/input/components/SettingsTextInput';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useMutation } from '@apollo/client/react';
import { useLingui } from '@lingui/react/macro';
import { styled } from '@linaria/react';
import { useState } from 'react';
import { isDefined } from 'twenty-shared/utils';
import { H2Title } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { UpdateWorkspaceDocument } from '~/generated-metadata/graphql';

const StyledFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${themeCssVariables.spacing[4]};
`;

export const WorkspaceProfileForm = () => {
  const { t } = useLingui();
  const { enqueueSuccessSnackBar, enqueueErrorSnackBar } = useSnackBar();

  const [currentWorkspace, setCurrentWorkspace] = useAtomState(
    currentWorkspaceState,
  );
  const isMultiWorkspaceEnabled = useAtomStateValue(
    isMultiWorkspaceEnabledState,
  );
  const domainConfiguration = useAtomStateValue(domainConfigurationState);

  const [updateWorkspace] = useMutation(UpdateWorkspaceDocument);

  const [displayName, setDisplayName] = useState(
    currentWorkspace?.displayName ?? '',
  );
  const [isSavingName, setIsSavingName] = useState(false);

  const {
    subdomain,
    error: subdomainError,
    isSubmitting: isSubmittingSubdomain,
    isSaveDisabled: isSubdomainSaveDisabled,
    handleChange: handleSubdomainChange,
    handleSave: handleSubdomainSave,
    handleConfirm: handleSubdomainConfirm,
  } = useSettingsSubdomain();

  const hasNameChanged =
    displayName.trim() !== '' &&
    displayName !== (currentWorkspace?.displayName ?? '');
  const hasSubdomainChanged =
    isMultiWorkspaceEnabled && !isSubdomainSaveDisabled;

  const isSaveDisabled =
    !(hasNameChanged || hasSubdomainChanged) ||
    isSavingName ||
    isSubmittingSubdomain;

  const saveName = async () => {
    setIsSavingName(true);

    try {
      await updateWorkspace({
        variables: { input: { displayName } },
        onCompleted: () => {
          setCurrentWorkspace((currentValue) =>
            isDefined(currentValue) ? { ...currentValue, displayName } : null,
          );
          enqueueSuccessSnackBar({ message: t`Workspace profile updated` });
        },
      });
    } catch {
      enqueueErrorSnackBar({});
    } finally {
      setIsSavingName(false);
    }
  };

  const handleSave = async () => {
    if (hasNameChanged) {
      await saveName();
    }

    // Changing the subdomain logs everyone out, so it goes through its own confirmation
    if (hasSubdomainChanged) {
      handleSubdomainSave();
    }
  };

  return (
    <>
      <H2Title
        title={t`Workspace profile`}
        description={t`Update how your workspace appears to teammates and in emails.`}
      />
      <StyledFields>
        <SettingsTextInput
          instanceId="workspace-profile-name"
          label={t`Workspace name`}
          value={displayName}
          onChange={setDisplayName}
          placeholder={t`Apple`}
          fullWidth
        />
        {isMultiWorkspaceEnabled && (
          <SettingsTextInput
            instanceId="workspace-profile-url"
            label={t`Workspace URL`}
            value={subdomain}
            onChange={handleSubdomainChange}
            error={subdomainError}
            disabled={isDefined(currentWorkspace?.customDomain)}
            rightAdornment={
              isDefined(domainConfiguration.frontDomain)
                ? `.${domainConfiguration.frontDomain}`
                : undefined
            }
            fullWidth
          />
        )}
        {/* There is no support email field on the workspace yet, so it is shown but not editable */}
        <SettingsTextInput
          instanceId="workspace-profile-support-email"
          label={t`Support email`}
          value=""
          placeholder={t`support@yourcompany.com`}
          disabled
          fullWidth
        />
      </StyledFields>
      <StyledActions>
        <Button
          title={t`Save`}
          variant="primary"
          size="small"
          accent="blue"
          disabled={isSaveDisabled}
          isLoading={isSavingName || isSubmittingSubdomain}
          onClick={handleSave}
        />
      </StyledActions>
      <ConfirmationModal
        modalInstanceId={SUBDOMAIN_CHANGE_CONFIRMATION_MODAL_ID}
        title={t`Change subdomain?`}
        subtitle={t`You're about to change your workspace subdomain. This action will log out all users.`}
        onConfirmClick={handleSubdomainConfirm}
      />
    </>
  );
};
