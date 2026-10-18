import { styled } from '@linaria/react';
import { IconSparkles } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { useSwitchToNewAiChat } from '@/ai/hooks/useSwitchToNewAiChat';
import { useHasPermissionFlag } from '@/settings/roles/hooks/useHasPermissionFlag';
import { PermissionFlagType } from '~/generated-metadata/graphql';

const StyledFloatingButton = styled.button`
  all: unset;
  align-items: center;
  background: ${themeCssVariables.color.blue};
  border-radius: ${themeCssVariables.border.radius.pill};
  bottom: 24px;
  box-shadow: ${themeCssVariables.boxShadow.strong};
  color: white;
  cursor: pointer;
  display: flex;
  height: 48px;
  justify-content: center;
  position: fixed;
  right: 24px;
  width: 48px;
  z-index: 30;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    box-shadow: ${themeCssVariables.boxShadow.superHeavy};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const AiFloatingButton = () => {
  const { switchToNewChat } = useSwitchToNewAiChat();
  const hasAiPermission = useHasPermissionFlag(PermissionFlagType.AI);

  if (!hasAiPermission) {
    return null;
  }

  return (
    <StyledFloatingButton
      onClick={switchToNewChat}
      aria-label="Open AI Assistant"
    >
      <IconSparkles size={22} stroke={2} />
    </StyledFloatingButton>
  );
};
