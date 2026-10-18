import { styled } from '@linaria/react';
import {
  IconSparkles,
  IconSend,
  IconHistory,
  IconPinned,
  IconX,
} from '@tabler/icons-react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type SuggestedPrompt = {
  label: string;
  prompt: string;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  sources?: string[];
};

type AiChatOverlayProps = {
  isOpen?: boolean;
  suggestedPrompts?: SuggestedPrompt[];
  messages?: ChatMessage[];
  isStreaming?: boolean;
  onClose?: () => void;
  onSend?: (message: string) => void;
  onPinToSidebar?: () => void;
  onViewHistory?: () => void;
};

const StyledBackdrop = styled.div`
  align-items: flex-start;
  display: flex;
  height: 100%;
  justify-content: center;
  padding-top: 15vh;
  width: 100%;
`;

const StyledOverlayCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  box-shadow: ${themeCssVariables.boxShadow.superHeavy};
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  width: 600px;
`;

const StyledHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledHeaderTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledHeaderActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledIconButton = styled.button`
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

const StyledInputArea = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledSparkleIcon = styled.div`
  align-items: center;
  color: ${themeCssVariables.color.blue};
  display: flex;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  all: unset;
  color: ${themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.md};

  &::placeholder {
    color: ${themeCssVariables.font.color.light};
  }
`;

const StyledSendButton = styled.button`
  all: unset;
  align-items: center;
  background: ${themeCssVariables.color.blue};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: white;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 28px;
  justify-content: center;
  width: 28px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const StyledSuggestedPromptsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledSuggestedPromptsLabel = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const StyledSuggestedPrompt = styled.button`
  all: unset;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.secondary};
  cursor: pointer;
  font-size: ${themeCssVariables.font.size.sm};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[2]};

  &:hover {
    background: ${themeCssVariables.background.transparent.light};
    color: ${themeCssVariables.font.color.primary};
  }
`;

const StyledMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${themeCssVariables.spacing[4]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledMessage = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  max-width: ${({ isUser }) => (isUser ? '80%' : '100%')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const StyledMessageBubble = styled.div<{ isUser: boolean }>`
  background: ${({ isUser }) =>
    isUser
      ? themeCssVariables.color.blue
      : themeCssVariables.background.secondary};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ isUser }) =>
    isUser ? 'white' : themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledMessageSources = styled.div`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
  padding: 0 ${themeCssVariables.spacing[1]};
`;

const StyledConfirmationCard = styled.div`
  background: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledConfirmationHeader = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  margin-bottom: ${themeCssVariables.spacing[2]};
  text-transform: uppercase;
`;

const StyledConfirmationField = styled.div`
  align-items: center;
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[1]} 0;
`;

const StyledFieldLabel = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  min-width: 60px;
`;

const StyledFieldValue = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledConfirmationActions = styled.div`
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: flex-end;
  margin-top: ${themeCssVariables.spacing[3]};
`;

const StyledConfirmButton = styled.button`
  all: unset;
  background: ${themeCssVariables.color.blue};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: white;
  cursor: pointer;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  padding: ${themeCssVariables.spacing[1]} ${themeCssVariables.spacing[3]};

  &:hover {
    opacity: 0.9;
  }
`;

const StyledCancelButton = styled.button`
  all: unset;
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.secondary};
  cursor: pointer;
  font-size: ${themeCssVariables.font.size.sm};
  padding: ${themeCssVariables.spacing[1]} ${themeCssVariables.spacing[3]};

  &:hover {
    background: ${themeCssVariables.background.transparent.light};
  }
`;

const StyledKeyboardHint = styled.div`
  align-items: center;
  border-top: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.light};
  display: flex;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[2]};
  justify-content: center;
  padding: ${themeCssVariables.spacing[2]};
`;

const StyledKbd = styled.kbd`
  background: ${themeCssVariables.background.tertiary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: 3px;
  font-family: inherit;
  font-size: 10px;
  padding: 1px 4px;
`;

export const AiChatOverlay = ({
  suggestedPrompts = [],
  messages = [],
  onClose,
  onPinToSidebar,
  onViewHistory,
}: AiChatOverlayProps) => {
  const hasMessages = messages.length > 0;

  return (
    <StyledBackdrop onClick={onClose}>
      <StyledOverlayCard onClick={(e) => e.stopPropagation()}>
        <StyledHeader>
          <StyledHeaderLeft>
            <IconSparkles
              size={16}
              stroke={2}
              color={themeCssVariables.color.blue}
            />
            <StyledHeaderTitle>Ask AI</StyledHeaderTitle>
          </StyledHeaderLeft>
          <StyledHeaderActions>
            <StyledIconButton onClick={onViewHistory} title="Chat history">
              <IconHistory size={16} stroke={1.8} />
            </StyledIconButton>
            <StyledIconButton onClick={onPinToSidebar} title="Pin to sidebar">
              <IconPinned size={16} stroke={1.8} />
            </StyledIconButton>
            <StyledIconButton onClick={onClose} title="Close">
              <IconX size={16} stroke={1.8} />
            </StyledIconButton>
          </StyledHeaderActions>
        </StyledHeader>

        <StyledInputArea>
          <StyledSparkleIcon>
            <IconSparkles size={16} stroke={2} />
          </StyledSparkleIcon>
          <StyledInput
            placeholder="Ask anything about your CRM..."
            autoFocus
          />
          <StyledSendButton>
            <IconSend size={14} stroke={2} />
          </StyledSendButton>
        </StyledInputArea>

        {!hasMessages && suggestedPrompts.length > 0 && (
          <StyledSuggestedPromptsContainer>
            <StyledSuggestedPromptsLabel>
              Suggested
            </StyledSuggestedPromptsLabel>
            {suggestedPrompts.map((prompt, index) => (
              <StyledSuggestedPrompt key={index}>
                {prompt.label}
              </StyledSuggestedPrompt>
            ))}
          </StyledSuggestedPromptsContainer>
        )}

        {hasMessages && (
          <StyledMessagesContainer>
            {messages.map((message) => (
              <StyledMessage key={message.id} isUser={message.role === 'user'}>
                <StyledMessageBubble isUser={message.role === 'user'}>
                  {message.content}
                </StyledMessageBubble>
                {message.sources && message.sources.length > 0 && (
                  <StyledMessageSources>
                    Based on {message.sources.join(', ')}
                  </StyledMessageSources>
                )}
              </StyledMessage>
            ))}

            {/* Example confirmation card for CRM actions */}
            <StyledConfirmationCard>
              <StyledConfirmationHeader>
                Will create: Deal
              </StyledConfirmationHeader>
              <StyledConfirmationField>
                <StyledFieldLabel>Name</StyledFieldLabel>
                <StyledFieldValue>Acme Corp Partnership</StyledFieldValue>
              </StyledConfirmationField>
              <StyledConfirmationField>
                <StyledFieldLabel>Amount</StyledFieldLabel>
                <StyledFieldValue>$50,000</StyledFieldValue>
              </StyledConfirmationField>
              <StyledConfirmationField>
                <StyledFieldLabel>Stage</StyledFieldLabel>
                <StyledFieldValue>Negotiation</StyledFieldValue>
              </StyledConfirmationField>
              <StyledConfirmationActions>
                <StyledCancelButton>Cancel</StyledCancelButton>
                <StyledConfirmButton>Confirm</StyledConfirmButton>
              </StyledConfirmationActions>
            </StyledConfirmationCard>
          </StyledMessagesContainer>
        )}

        <StyledKeyboardHint>
          <StyledKbd>&#8984;K</StyledKbd> to open
          <span style={{ margin: '0 4px' }}>&middot;</span>
          <StyledKbd>Esc</StyledKbd> to close
          <span style={{ margin: '0 4px' }}>&middot;</span>
          <StyledKbd>&#8984;&#8679;K</StyledKbd> pin to sidebar
        </StyledKeyboardHint>
      </StyledOverlayCard>
    </StyledBackdrop>
  );
};
