import { styled } from '@linaria/react';
import {
  IconSparkles,
  IconSend,
  IconRefresh,
  IconCopy,
  IconArrowBack,
  IconMoodSmile,
  IconBriefcase,
  IconPencil,
} from '@tabler/icons-react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type ToneOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

type AiEmailDraftPanelProps = {
  recipientName?: string;
  recipientEmail?: string;
  subject?: string;
  draftBody?: string;
  isGenerating?: boolean;
  selectedTone?: string;
  onToneChange?: (toneId: string) => void;
  onRegenerate?: () => void;
  onCopy?: () => void;
  onInsert?: () => void;
  onBack?: () => void;
};

const StyledPanel = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 480px;
`;

const StyledHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledBackButton = styled.button`
  all: unset;
  align-items: center;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.tertiary};
  cursor: pointer;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  width: 28px;

  &:hover {
    background: ${themeCssVariables.background.transparent.light};
    color: ${themeCssVariables.font.color.secondary};
  }
`;

const StyledHeaderTitle = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledAiBadge = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.transparent.light};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${themeCssVariables.color.blue};
  display: inline-flex;
  gap: 2px;
  height: 20px;
  padding: 0 ${themeCssVariables.spacing[2]};
`;

const StyledAiBadgeLabel = styled.span`
  font-size: 11px;
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledPromptSection = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledPromptLabel = styled.span`
  color: ${themeCssVariables.font.color.light};
  display: block;
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  letter-spacing: 0.3px;
  margin-bottom: ${themeCssVariables.spacing[2]};
  text-transform: uppercase;
`;

const StyledPromptInput = styled.textarea`
  all: unset;
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
  min-height: 40px;
  resize: none;
  width: 100%;

  &::placeholder {
    color: ${themeCssVariables.font.color.light};
  }
`;

const StyledToneSection = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[4]};
`;

const StyledTonePill = styled.button<{ isActive: boolean }>`
  all: unset;
  align-items: center;
  background: ${({ isActive }) =>
    isActive
      ? themeCssVariables.color.blue
      : themeCssVariables.background.primary};
  border: 1px solid
    ${({ isActive }) =>
      isActive
        ? themeCssVariables.color.blue
        : themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.pill};
  color: ${({ isActive }) =>
    isActive ? 'white' : themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[1]};
  height: 26px;
  padding: 0 ${themeCssVariables.spacing[2]};
  transition:
    background 150ms,
    border-color 150ms;

  &:hover {
    background: ${({ isActive }) =>
      isActive
        ? themeCssVariables.color.blue
        : themeCssVariables.background.tertiary};
    border-color: ${({ isActive }) =>
      isActive
        ? themeCssVariables.color.blue
        : themeCssVariables.border.color.strong};
  }
`;

const StyledDraftSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledRecipientBar = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.secondary};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  margin-bottom: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledRecipientLabel = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
  min-width: 24px;
`;

const StyledRecipientValue = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledSubjectLine = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
  margin-bottom: ${themeCssVariables.spacing[3]};
  padding-bottom: ${themeCssVariables.spacing[2]};
`;

const StyledDraftBody = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.7;
  white-space: pre-wrap;
`;

const StyledShimmerLine = styled.div<{ width: string }>`
  animation: shimmer 1.5s infinite;
  background: linear-gradient(
    90deg,
    ${themeCssVariables.background.tertiary} 25%,
    ${themeCssVariables.background.quaternary} 50%,
    ${themeCssVariables.background.tertiary} 75%
  );
  background-size: 200% 100%;
  border-radius: ${themeCssVariables.border.radius.xs};
  height: 14px;
  margin-bottom: ${themeCssVariables.spacing[2]};
  width: ${({ width }) => width};

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const StyledFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledFooterActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledActionButton = styled.button`
  all: unset;
  align-items: center;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.tertiary};
  cursor: pointer;
  display: inline-flex;
  gap: ${themeCssVariables.spacing[1]};
  height: 28px;
  justify-content: center;
  padding: 0 ${themeCssVariables.spacing[2]};

  &:hover {
    background: ${themeCssVariables.background.transparent.light};
    color: ${themeCssVariables.font.color.secondary};
  }
`;

const StyledActionLabel = styled.span`
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledInsertButton = styled.button`
  all: unset;
  align-items: center;
  background: ${themeCssVariables.color.blue};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  gap: ${themeCssVariables.spacing[1]};
  height: 32px;
  padding: 0 ${themeCssVariables.spacing[4]};

  &:hover {
    opacity: 0.9;
  }
`;

const TONE_OPTIONS: ToneOption[] = [
  {
    id: 'professional',
    label: 'Professional',
    icon: <IconBriefcase size={12} stroke={2} />,
  },
  {
    id: 'friendly',
    label: 'Friendly',
    icon: <IconMoodSmile size={12} stroke={2} />,
  },
  {
    id: 'concise',
    label: 'Concise',
    icon: <IconPencil size={12} stroke={2} />,
  },
];

export const AiEmailDraftPanel = ({
  recipientName = 'Sarah Chen',
  recipientEmail = 'sarah@acmecorp.com',
  subject = 'Re: Partnership Proposal — Next Steps',
  draftBody = `Hi Sarah,

Thank you for taking the time to discuss the partnership proposal yesterday. I wanted to follow up on a few key points from our conversation.

Based on our discussion, here's what I'd suggest as next steps:

1. I'll send over the revised pricing structure by end of week
2. Your team reviews the technical integration requirements
3. We schedule a joint call with both engineering teams for next Tuesday

I've also attached the updated scope document that reflects the changes we discussed around the API access tiers.

Looking forward to moving this forward. Let me know if you have any questions in the meantime.

Best regards`,
  isGenerating = false,
  selectedTone = 'professional',
  onToneChange,
  onRegenerate,
  onCopy,
  onInsert,
  onBack,
}: AiEmailDraftPanelProps) => {
  return (
    <StyledPanel>
      <StyledHeader>
        <StyledBackButton onClick={onBack} title="Back">
          <IconArrowBack size={16} stroke={1.8} />
        </StyledBackButton>
        <StyledHeaderTitle>
          <StyledAiBadge>
            <IconSparkles size={12} stroke={2} />
            <StyledAiBadgeLabel>AI</StyledAiBadgeLabel>
          </StyledAiBadge>
          <StyledTitle>Draft Email</StyledTitle>
        </StyledHeaderTitle>
      </StyledHeader>

      <StyledPromptSection>
        <StyledPromptLabel>Context</StyledPromptLabel>
        <StyledPromptInput
          placeholder="What should this email be about? e.g. 'Follow up on partnership deal, mention revised pricing...'"
          defaultValue="Follow up on yesterday's partnership call with Sarah, confirm next steps and share updated scope document"
          rows={2}
        />
      </StyledPromptSection>

      <StyledToneSection>
        {TONE_OPTIONS.map((tone) => (
          <StyledTonePill
            key={tone.id}
            isActive={tone.id === selectedTone}
            onClick={() => onToneChange?.(tone.id)}
          >
            {tone.icon}
            {tone.label}
          </StyledTonePill>
        ))}
      </StyledToneSection>

      <StyledDraftSection>
        <StyledRecipientBar>
          <StyledRecipientLabel>To</StyledRecipientLabel>
          <StyledRecipientValue>
            {recipientName} &lt;{recipientEmail}&gt;
          </StyledRecipientValue>
        </StyledRecipientBar>

        <StyledSubjectLine>{subject}</StyledSubjectLine>

        {isGenerating ? (
          <>
            <StyledShimmerLine width="95%" />
            <StyledShimmerLine width="80%" />
            <StyledShimmerLine width="88%" />
            <StyledShimmerLine width="60%" />
            <StyledShimmerLine width="92%" />
            <StyledShimmerLine width="75%" />
            <StyledShimmerLine width="85%" />
            <StyledShimmerLine width="45%" />
          </>
        ) : (
          <StyledDraftBody>{draftBody}</StyledDraftBody>
        )}
      </StyledDraftSection>

      <StyledFooter>
        <StyledFooterActions>
          <StyledActionButton onClick={onRegenerate} title="Regenerate">
            <IconRefresh size={14} stroke={1.8} />
            <StyledActionLabel>Regenerate</StyledActionLabel>
          </StyledActionButton>
          <StyledActionButton onClick={onCopy} title="Copy">
            <IconCopy size={14} stroke={1.8} />
            <StyledActionLabel>Copy</StyledActionLabel>
          </StyledActionButton>
        </StyledFooterActions>
        <StyledInsertButton onClick={onInsert}>
          <IconSend size={14} stroke={2} />
          Insert into composer
        </StyledInsertButton>
      </StyledFooter>
    </StyledPanel>
  );
};
