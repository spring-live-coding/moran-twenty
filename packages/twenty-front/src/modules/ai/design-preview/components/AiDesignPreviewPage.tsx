import { styled } from '@linaria/react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import {
  AiRecordSummaryCard,
} from '@/ai/design-preview/components/AiRecordSummaryCard';
import {
  AiRecommendedActions,
  CONTACT_ACTIONS,
  DEAL_ACTIONS,
} from '@/ai/design-preview/components/AiRecommendedActions';
import { AiChatOverlay } from '@/ai/design-preview/components/AiChatOverlay';
import { AiEmailDraftPanel } from '@/ai/design-preview/components/AiEmailDraftPanel';

const StyledPage = styled.div`
  background: ${themeCssVariables.background.secondary};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[8]};
  min-height: 100vh;
  padding: ${themeCssVariables.spacing[8]};
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  max-width: 960px;
`;

const StyledSectionTitle = styled.h2`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin: 0;
`;

const StyledSectionDescription = styled.p`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.5;
  margin: 0;
`;

const StyledVariantRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[4]};
`;

const StyledVariantLabel = styled.span`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.medium};
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const StyledVariantBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledCardContainer = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.md};
  overflow: hidden;
  width: 400px;
`;

const StyledOverlayPreview = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.transparent.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  justify-content: center;
  min-height: 500px;
  padding: ${themeCssVariables.spacing[6]};
  position: relative;
`;

export const AiDesignPreviewPage = () => {
  return (
    <StyledPage>
      {/* Section 1: Record Summary Card */}
      <StyledSection>
        <StyledSectionTitle>
          1. AI Record Summary Card
        </StyledSectionTitle>
        <StyledSectionDescription>
          Appears on record detail pages below the existing summary card.
          Shows an AI-generated headline, key facts, data sources, and
          last-updated timestamp. Supports loading shimmer and collapsed states.
        </StyledSectionDescription>

        <StyledVariantRow>
          <StyledVariantBlock>
            <StyledVariantLabel>Default — Contact</StyledVariantLabel>
            <StyledCardContainer>
              <AiRecordSummaryCard
                headline="Sarah Chen is a VP of Engineering at Acme Corp, with active engagement across 3 deals totaling $180K. Last meeting was 2 days ago."
                keyFacts={[
                  'Decision-maker on Acme Corp Partnership ($50K, Negotiation)',
                  'Responded to last 4 emails within 24h — high engagement',
                  'Connected via LinkedIn; warm intro from James Miller',
                  'Attended product demo on June 15 — asked about API limits',
                ]}
                dataSourcesLabel="Based on emails, meetings, deals"
                lastUpdated="Updated 2 min ago"
              />
            </StyledCardContainer>
          </StyledVariantBlock>

          <StyledVariantBlock>
            <StyledVariantLabel>Loading state</StyledVariantLabel>
            <StyledCardContainer>
              <AiRecordSummaryCard
                headline=""
                keyFacts={[]}
                dataSourcesLabel=""
                lastUpdated=""
                isLoading
              />
            </StyledCardContainer>
          </StyledVariantBlock>

          <StyledVariantBlock>
            <StyledVariantLabel>Collapsed</StyledVariantLabel>
            <StyledCardContainer>
              <AiRecordSummaryCard
                headline="Sarah Chen is a VP of Engineering at Acme Corp."
                keyFacts={[]}
                dataSourcesLabel="Based on emails, meetings, deals"
                lastUpdated="Updated 2 min ago"
                isCollapsed
              />
            </StyledCardContainer>
          </StyledVariantBlock>
        </StyledVariantRow>
      </StyledSection>

      {/* Section 2: Recommended Actions */}
      <StyledSection>
        <StyledSectionTitle>
          2. AI Recommended Actions
        </StyledSectionTitle>
        <StyledSectionDescription>
          Context-aware action pills displayed beneath the summary card.
          Actions change based on record type (contact, deal, company).
        </StyledSectionDescription>

        <StyledVariantRow>
          <StyledVariantBlock>
            <StyledVariantLabel>Contact actions</StyledVariantLabel>
            <StyledCardContainer>
              <div style={{ padding: '12px 0' }}>
                <AiRecommendedActions actions={CONTACT_ACTIONS} />
              </div>
            </StyledCardContainer>
          </StyledVariantBlock>

          <StyledVariantBlock>
            <StyledVariantLabel>Deal actions</StyledVariantLabel>
            <StyledCardContainer>
              <div style={{ padding: '12px 0' }}>
                <AiRecommendedActions actions={DEAL_ACTIONS} />
              </div>
            </StyledCardContainer>
          </StyledVariantBlock>
        </StyledVariantRow>
      </StyledSection>

      {/* Section 3: AI Chat Overlay (Cmd+K) */}
      <StyledSection>
        <StyledSectionTitle>
          3. AI Chat Panel (Cmd+K Overlay)
        </StyledSectionTitle>
        <StyledSectionDescription>
          Spotlight-style command palette for natural language queries.
          Supports suggested prompts, conversation messages, and
          CRM action confirmation cards with inline diffs.
        </StyledSectionDescription>

        <StyledVariantRow>
          <StyledVariantBlock>
            <StyledVariantLabel>Empty state with suggestions</StyledVariantLabel>
            <StyledOverlayPreview>
              <AiChatOverlay
                suggestedPrompts={[
                  {
                    label: 'Summarize my pipeline this quarter',
                    prompt: 'Summarize my pipeline this quarter',
                  },
                  {
                    label: 'Draft a follow-up email to recent leads',
                    prompt: 'Draft a follow-up email to recent leads',
                  },
                  {
                    label: 'Which deals are at risk of slipping?',
                    prompt: 'Which deals are at risk of slipping?',
                  },
                ]}
              />
            </StyledOverlayPreview>
          </StyledVariantBlock>
        </StyledVariantRow>

        <StyledVariantRow>
          <StyledVariantBlock>
            <StyledVariantLabel>With conversation + action card</StyledVariantLabel>
            <StyledOverlayPreview>
              <AiChatOverlay
                messages={[
                  {
                    id: '1',
                    role: 'user',
                    content:
                      'Create a deal for the Acme Corp partnership, $50K in negotiation stage',
                  },
                  {
                    id: '2',
                    role: 'assistant',
                    content:
                      "I'll create that deal for you. Here's what I'm about to do — please confirm:",
                    sources: ['Deals', 'Companies'],
                  },
                ]}
              />
            </StyledOverlayPreview>
          </StyledVariantBlock>
        </StyledVariantRow>
      </StyledSection>

      {/* Section 4: AI Email Drafting */}
      <StyledSection>
        <StyledSectionTitle>
          4. AI Email Drafting
        </StyledSectionTitle>
        <StyledSectionDescription>
          Side panel for AI-assisted email composition. Users describe the
          intent, pick a tone, and get a full draft that can be regenerated,
          copied, or inserted directly into the email composer.
        </StyledSectionDescription>

        <StyledVariantRow>
          <StyledVariantBlock>
            <StyledVariantLabel>Draft ready</StyledVariantLabel>
            <AiEmailDraftPanel />
          </StyledVariantBlock>

          <StyledVariantBlock>
            <StyledVariantLabel>Generating</StyledVariantLabel>
            <AiEmailDraftPanel isGenerating />
          </StyledVariantBlock>
        </StyledVariantRow>
      </StyledSection>
    </StyledPage>
  );
};
