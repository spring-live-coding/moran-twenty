import { styled } from '@linaria/react';
import {
  IconMail,
  IconNotes,
  IconUserSearch,
  IconAlertTriangle,
  IconCalendar,
  IconArrowsShuffle,
  type Icon,
} from '@tabler/icons-react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type AiAction = {
  id: string;
  label: string;
  Icon: Icon;
  onClick?: () => void;
};

type AiRecommendedActionsProps = {
  actions: AiAction[];
  onDismiss?: (actionId: string) => void;
};

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
  padding: 0 ${themeCssVariables.spacing[4]} ${themeCssVariables.spacing[3]};
`;

const StyledActionPill = styled.button`
  all: unset;
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
  height: 28px;
  padding: 0 ${themeCssVariables.spacing[3]} 0 ${themeCssVariables.spacing[2]};
  transition:
    background 150ms,
    border-color 150ms;
  white-space: nowrap;

  &:hover {
    background: ${themeCssVariables.background.tertiary};
    border-color: ${themeCssVariables.border.color.strong};
  }

  &:active {
    background: ${themeCssVariables.background.quaternary};
  }
`;

const StyledIconWrapper = styled.span`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: inline-flex;
`;

export const CONTACT_ACTIONS: AiAction[] = [
  { id: 'draft-email', label: 'Draft email', Icon: IconMail },
  { id: 'meeting-brief', label: 'Prepare meeting brief', Icon: IconCalendar },
  { id: 'enrich', label: 'Enrich contact', Icon: IconUserSearch },
];

export const DEAL_ACTIONS: AiAction[] = [
  { id: 'draft-followup', label: 'Draft follow-up', Icon: IconMail },
  { id: 'identify-risks', label: 'Identify risks', Icon: IconAlertTriangle },
  { id: 'update-stage', label: 'Update stage', Icon: IconArrowsShuffle },
  { id: 'close-plan', label: 'Prepare close plan', Icon: IconNotes },
];

export const COMPANY_ACTIONS: AiAction[] = [
  { id: 'summarize', label: 'Summarize account', Icon: IconNotes },
  { id: 'research', label: 'Research company', Icon: IconUserSearch },
  { id: 'draft-email', label: 'Draft email', Icon: IconMail },
];

export const AiRecommendedActions = ({
  actions,
}: AiRecommendedActionsProps) => {
  return (
    <StyledContainer>
      {actions.map((action) => (
        <StyledActionPill key={action.id} onClick={action.onClick}>
          <StyledIconWrapper>
            <action.Icon size={14} stroke={1.8} />
          </StyledIconWrapper>
          {action.label}
        </StyledActionPill>
      ))}
    </StyledContainer>
  );
};
