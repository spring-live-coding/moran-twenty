import { type Meta, type StoryObj } from '@storybook/react-vite';

import { AiDesignPreviewPage } from '@/ai/design-preview/components/AiDesignPreviewPage';
import { AiRecordSummaryCard } from '@/ai/design-preview/components/AiRecordSummaryCard';
import {
  AiRecommendedActions,
  CONTACT_ACTIONS,
  DEAL_ACTIONS,
  COMPANY_ACTIONS,
} from '@/ai/design-preview/components/AiRecommendedActions';
import { AiChatOverlay } from '@/ai/design-preview/components/AiChatOverlay';
import { AiEmailDraftPanel } from '@/ai/design-preview/components/AiEmailDraftPanel';

import { ComponentDecorator } from 'twenty-ui/testing';

// Full preview page — all Phase 1 components together
const previewMeta: Meta<typeof AiDesignPreviewPage> = {
  title: 'Modules/AI/DesignPreview/AllPhase1Components',
  component: AiDesignPreviewPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default previewMeta;
type PreviewStory = StoryObj<typeof AiDesignPreviewPage>;

export const AllComponents: PreviewStory = {
  render: () => <AiDesignPreviewPage />,
};

// Individual component stories

export const RecordSummaryCard: PreviewStory = {
  render: () => (
    <div style={{ width: 400, padding: 24 }}>
      <AiRecordSummaryCard
        headline="Sarah Chen is a VP of Engineering at Acme Corp, with active engagement across 3 deals totaling $180K."
        keyFacts={[
          'Decision-maker on Acme Corp Partnership ($50K, Negotiation)',
          'Responded to last 4 emails within 24h — high engagement',
          'Connected via LinkedIn; warm intro from James Miller',
          'Attended product demo on June 15 — asked about API limits',
        ]}
        dataSourcesLabel="Based on emails, meetings, deals"
        lastUpdated="Updated 2 min ago"
      />
    </div>
  ),
};

export const RecordSummaryCardLoading: PreviewStory = {
  render: () => (
    <div style={{ width: 400, padding: 24 }}>
      <AiRecordSummaryCard
        headline=""
        keyFacts={[]}
        dataSourcesLabel=""
        lastUpdated=""
        isLoading
      />
    </div>
  ),
};

export const RecommendedActionsContact: PreviewStory = {
  render: () => (
    <div style={{ padding: 24 }}>
      <AiRecommendedActions actions={CONTACT_ACTIONS} />
    </div>
  ),
};

export const RecommendedActionsDeal: PreviewStory = {
  render: () => (
    <div style={{ padding: 24 }}>
      <AiRecommendedActions actions={DEAL_ACTIONS} />
    </div>
  ),
};

export const RecommendedActionsCompany: PreviewStory = {
  render: () => (
    <div style={{ padding: 24 }}>
      <AiRecommendedActions actions={COMPANY_ACTIONS} />
    </div>
  ),
};

export const ChatOverlayEmpty: PreviewStory = {
  render: () => (
    <div
      style={{
        height: 600,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 80,
      }}
    >
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
    </div>
  ),
};

export const ChatOverlayWithMessages: PreviewStory = {
  render: () => (
    <div
      style={{
        height: 600,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 80,
      }}
    >
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
    </div>
  ),
};

export const EmailDraftReady: PreviewStory = {
  render: () => (
    <div style={{ padding: 24 }}>
      <AiEmailDraftPanel />
    </div>
  ),
};

export const EmailDraftGenerating: PreviewStory = {
  render: () => (
    <div style={{ padding: 24 }}>
      <AiEmailDraftPanel isGenerating />
    </div>
  ),
};
