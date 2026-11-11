import { useMutation } from '@apollo/client/react';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { isDefined } from 'twenty-shared/utils';
import { Button } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { SettingsTextInput } from '@/ui/input/components/SettingsTextInput';
import { TextInput } from '@/ui/input/components/TextInput';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { UpdateWorkspaceDocument } from '~/generated-metadata/graphql';
import { logError } from '~/utils/logError';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
`;

const StyledCard = styled.div`
  background-color: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.md};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[5]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledActions = styled.div`
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: flex-end;
`;

export const SettingsWorkspaceDetailsForm = () => {
  const { t } = useLingui();
  const { enqueueSuccessSnackBar, enqueueErrorSnackBar } = useSnackBar();

  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const setCurrentWorkspace = useSetAtomState(currentWorkspaceState);

  const savedDisplayName = currentWorkspace?.displayName ?? '';

  const [displayName, setDisplayName] = useState(savedDisplayName);
  const [isSaving, setIsSaving] = useState(false);

  const [updateWorkspace] = useMutation(UpdateWorkspaceDocument);

  const hasChanged = displayName !== savedDisplayName;
  const canSave = hasChanged && displayName.trim() !== '' && !isSaving;

  const handleDiscard = () => {
    setDisplayName(savedDisplayName);
  };

  const handleSave = async () => {
    const nextDisplayName = displayName.trim();

    setIsSaving(true);

    try {
      const result = await updateWorkspace({
        variables: { input: { displayName: nextDisplayName } },
      });

      if (isDefined(result.error) || !isDefined(result.data?.updateWorkspace)) {
        throw result.error;
      }

      setCurrentWorkspace((currentValue) =>
        currentValue === null
          ? null
          : { ...currentValue, displayName: nextDisplayName },
      );
      setDisplayName(nextDisplayName);
      enqueueSuccessSnackBar({ message: t`Workspace details updated` });
    } catch (error) {
      logError(error);
      enqueueErrorSnackBar({ message: t`Could not update workspace details` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <SettingsTextInput
          instanceId="workspace-details-name"
          label={t`Workspace name`}
          value={displayName}
          onChange={setDisplayName}
          placeholder={t`Workspace name`}
          fullWidth
        />
        <TextInput
          label={t`Workspace URL`}
          value={currentWorkspace?.workspaceUrls?.subdomainUrl ?? ''}
          disabled
          fullWidth
        />
      </StyledCard>
      <StyledActions>
        <Button
          variant="secondary"
          title={t`Discard`}
          disabled={!hasChanged || isSaving}
          onClick={handleDiscard}
        />
        <Button
          variant="primary"
          accent="blue"
          title={t`Save changes`}
          disabled={!canSave}
          onClick={handleSave}
        />
      </StyledActions>
    </StyledContainer>
  );
};
