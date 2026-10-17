# Product Requirements Document: Twenty AI Assistant

**Version:** 1.0
**Date:** June 24, 2026
**Author:** Product Management
**Status:** Draft
**Companion Document:** [Competitor Research](./ai-assistant-competitor-research.md)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Vision & Goals](#3-vision--goals)
4. [Target Users](#4-target-users)
5. [Design Principles](#5-design-principles)
6. [Phase 1 -- MVP: Core AI Assistant](#6-phase-1--mvp-core-ai-assistant)
7. [Phase 2 -- Differentiation: Intelligence Layer](#7-phase-2--differentiation-intelligence-layer)
8. [Phase 3 -- Expansion: Autonomous & Multi-Surface](#8-phase-3--expansion-autonomous--multi-surface)
9. [Architecture & Technical Design](#9-architecture--technical-design)
10. [Pricing & Packaging Strategy](#10-pricing--packaging-strategy)
11. [Trust, Privacy & Transparency](#11-trust-privacy--transparency)
12. [Success Metrics](#12-success-metrics)
13. [Risk Assessment & Mitigations](#13-risk-assessment--mitigations)
14. [Timeline & Milestones](#14-timeline--milestones)
15. [Open Questions](#15-open-questions)

---

## 1. Executive Summary

Twenty AI Assistant is a CRM-native AI layer that lives throughout the Twenty product -- not as a bolted-on chatbot, but as ambient intelligence embedded in every surface users interact with. It combines three interaction paradigms:

1. **Inline AI** -- Proactive summaries, recommended actions, and AI-powered fields that appear directly in record views, list views, and pipelines without any user prompting
2. **Conversational AI** -- A global chat panel (Cmd+K or sidebar) for open-ended questions, natural language CRM queries, and multi-step actions
3. **Purpose-Built Assistants** -- Specialized AI workflows for follow-ups, meeting prep, enrichment, and deal analysis

Based on competitive research across Salesforce, HubSpot, Attio, Clay, and Folk CRM, the biggest opportunity is solving the three universal pain points no competitor has addressed:
- **The "chat sidebar detour"** -- AI that adds steps instead of removing them
- **Credit anxiety** -- unpredictable costs and mid-month exhaustion
- **No cross-dataset intelligence** -- AI that only sees individual records, not patterns

Twenty's unique advantages -- open-source, self-hostable, full data model ownership -- create differentiation that no closed-source competitor can replicate.

---

## 2. Problem Statement

### For CRM Users
CRM users spend significant time on repetitive, low-value tasks:
- Manually summarizing account histories before calls (15-30 min per meeting)
- Writing personalized outreach emails from scratch (10-20 min per email)
- Searching across records, emails, and notes to find relevant context (5-15 min per query)
- Updating CRM fields after calls, meetings, and emails (10-20 min daily)
- Identifying which deals need attention and why (30+ min weekly for managers)

Existing AI solutions from competitors either:
- Force users into a chat sidebar that disrupts their workflow (Salesforce, HubSpot, Attio)
- Charge unpredictable credit-based fees that create anxiety (all competitors)
- Operate only on individual records without seeing cross-dataset patterns (all competitors)
- Require complex enterprise setup and configuration (Salesforce)
- Lack a conversational interface entirely, routing to external tools (Folk, Clay)

### For Twenty
- AI is now table stakes for CRM products -- users expect it
- Competitors are shipping AI features at aggressive cadences (Attio: every 3-4 weeks)
- Without AI, Twenty risks being perceived as a "dumb" CRM in an AI-native market
- Open-source + self-hosted positioning creates a unique AI value proposition around data sovereignty

---

## 3. Vision & Goals

### Vision Statement
**Make every CRM interaction smarter without making users do more work.** Twenty AI should feel like a knowledgeable colleague who has already read every email, attended every meeting, and analyzed every deal -- surfacing insights exactly when and where they're useful, without requiring users to ask.

### Strategic Goals

| Goal | Metric | Target | Timeline |
|------|--------|--------|----------|
| **Adoption** | Weekly active AI users / total active users | >40% | 6 months post-Phase 1 |
| **Value delivery** | Time saved per user per week | >2 hours | 3 months post-Phase 1 |
| **Quality** | AI output edit rate (% modified before use) | <30% | Phase 1 GA |
| **Retention impact** | Churn rate delta: AI users vs. non-AI users | >20% lower | 12 months post-launch |
| **Competitive win rate** | Deals won citing AI as deciding factor | >15% | Phase 2 complete |
| **Data completeness** | Field fill rate increase after AI enrichment | >50% | Phase 2 complete |

### Non-Goals (Explicitly Out of Scope)
- Building a general-purpose AI chatbot (we are building a CRM AI, not ChatGPT)
- Replacing human decision-making (AI assists and recommends; humans decide)
- Training models on customer data (privacy is non-negotiable)
- Building our own LLM (we integrate best-in-class models)
- Competing with Clay on data enrichment breadth (we focus on CRM-native intelligence)

---

## 4. Target Users

### Primary Personas

**Sales Representative (IC)**
- Uses Twenty daily for pipeline management, contact tracking, email outreach
- Pain: spends too much time on data entry and meeting prep
- Need: AI that reduces admin work so they can spend more time selling
- AI value: auto-summaries, email drafting, activity logging, follow-up reminders

**Sales Manager / Team Lead**
- Uses Twenty for pipeline reviews, forecasting, team performance
- Pain: can't quickly identify which deals need attention and why
- Need: AI that surfaces deal risks, patterns, and team insights proactively
- AI value: deal health scoring, pipeline analysis, cross-dataset insights

**RevOps / CRM Admin**
- Configures Twenty for the team, manages data quality, builds workflows
- Pain: manual data cleanup, workflow creation, enrichment processes
- Need: AI that automates data hygiene and makes workflow creation easier
- AI value: AI-powered fields, natural language workflow building, data enrichment

### Secondary Personas

**Founder / Solo User**
- Does everything: sales, marketing, support, relationship management
- Need: AI that acts as a virtual sales assistant, handling the busy work
- AI value: the full suite, but especially meeting prep, follow-ups, and enrichment

**Developer (Self-Hosted)**
- Runs Twenty on own infrastructure, may extend with custom code
- Need: AI that respects data sovereignty and can use custom/local models
- AI value: self-hosted model support, MCP server, API access to AI features

---

## 5. Design Principles

### 5.1 Ambient Over Explicit
AI should surface insights proactively in the user's workflow, not require them to navigate to a separate panel. The best AI interaction is one the user didn't have to initiate.

### 5.2 Inline Over Overlay
Prefer embedding AI directly in existing UI surfaces (record cards, field values, list annotations) over modal windows or floating panels. The chat panel exists for open-ended questions, not as the primary AI experience.

### 5.3 Confidence Over Completeness
Always show confidence levels and data sources. An AI response that says "Based on 3 emails and 1 meeting note (no call data available), this deal appears healthy" is more trustworthy than a generic "This deal looks good."

### 5.4 Graceful Degradation
AI must remain useful even with incomplete data. If a contact has only an email address and no interaction history, the AI should still offer enrichment suggestions rather than returning nothing.

### 5.5 No Surprises
Never modify CRM data without explicit user confirmation. Never charge credits unexpectedly. Never surface AI where the user didn't expect it. Build trust through predictability.

### 5.6 Model-Agnostic
Support multiple AI model providers. Users should be able to choose their preferred model (Claude, GPT, Gemini, local models) without losing functionality.

### 5.7 Open-Source First
Every AI feature should work in self-hosted deployments. Users who bring their own API keys should have full access to all AI capabilities.

---

## 6. Phase 1 -- MVP: Core AI Assistant

**Goal:** Deliver immediate, tangible value through the four most-requested AI capabilities. Establish the AI interaction patterns that will scale in later phases.

**Timeline:** 8-10 weeks development + 2 weeks beta

### 6.1 Feature: Record Summary Cards

**Description:** Auto-generated AI summary cards that appear at the top of every record page (Contact, Company, Deal, Task). The card synthesizes all available data -- activities, emails, notes, related records, field values -- into a concise, actionable brief.

**Competitive context:** HubSpot's auto-generated Record Summary Card is their most praised AI feature. Attio's Recap Assistant also does this well. Salesforce supports it but requires configuration. Folk's Recap requires manual triggering.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| RS-1 | Sales rep | See a 3-5 sentence summary at the top of any Contact record | I can quickly understand the relationship status before a call | P0 |
| RS-2 | Sales rep | See a Deal summary highlighting current stage, last activity, next steps, and blockers | I know exactly where a deal stands without reading every note | P0 |
| RS-3 | Sales manager | See a Company summary showing all active deals, key contacts, and recent engagement | I can prepare for account reviews in seconds | P0 |
| RS-4 | Any user | See when the summary was last generated and from what data sources | I can trust the summary's accuracy and recency | P0 |
| RS-5 | Any user | Click "Refresh" to regenerate a summary with latest data | I can get updated context after new activities | P0 |
| RS-6 | Any user | Collapse or hide the summary card if I don't want it | The AI doesn't clutter my workspace when I don't need it | P1 |
| RS-7 | RevOps admin | Configure summary templates per object type (what to include/exclude) | Summaries are tailored to our sales process | P1 |

**Acceptance Criteria:**
- Summary card loads within 3 seconds of page render
- Summary includes: relationship timeline, last interaction (channel + date + brief), deal status (if applicable), upcoming meetings/tasks, suggested next action
- Summary cites data sources (e.g., "Based on 12 emails, 3 meetings, 5 notes")
- Summary updates when underlying data changes (not real-time; on page load or manual refresh)
- Card is collapsible and remembers user preference
- Works for Contact, Company, Deal, and Task record types
- Handles records with minimal data gracefully ("Limited data available. Consider adding notes or connecting email.")

**UI Specification:**
- **Location:** Top of record detail page, below the record header and above the timeline/activity feed
- **Visual design:** Subtle card with light background differentiation (match existing Twenty card patterns), small "AI" badge in corner
- **Content structure:**
  - Headline summary (1-2 sentences, bold)
  - Key facts (bulleted, 3-5 items)
  - Data freshness indicator ("Updated 2 hours ago from 12 emails, 3 meetings")
  - Action row: "Refresh" | "Copy" | "Collapse"
- **Loading state:** Skeleton loader matching card dimensions
- **Error state:** "Unable to generate summary. [Retry]" with graceful fallback

---

### 6.2 Feature: AI Chat Panel (Cmd+K)

**Description:** A global conversational AI interface accessible from anywhere in Twenty via Cmd+K keyboard shortcut or a persistent icon in the navigation. Supports natural language CRM queries, record creation/updates, and open-ended questions grounded in CRM data.

**Competitive context:** Salesforce, HubSpot, and Attio all use a right sidebar panel. Attio also integrates with Cmd+K. The sidebar pattern is familiar but criticized as a "workflow detour." Our approach: Cmd+K as primary (fast, keyboard-native) with optional sidebar for extended conversations.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| CP-1 | Sales rep | Press Cmd+K and type a natural language question about my CRM data | I can find information without navigating through records | P0 |
| CP-2 | Sales rep | Ask "What deals are closing this month?" and get a structured answer | I can review my pipeline without building a report | P0 |
| CP-3 | Sales rep | Ask "Summarize my last 3 interactions with [Contact Name]" | I can prepare for a call in seconds | P0 |
| CP-4 | Sales rep | Say "Create a deal for Acme Corp, $50K, Negotiation stage" and have it created | I can add records without filling out forms | P0 |
| CP-5 | Sales rep | Say "Update the Acme deal to Closed Won" and have it done after confirmation | I can update records conversationally | P0 |
| CP-6 | Sales rep | Say "Draft an email to [Contact] following up on our meeting yesterday" | I get a contextual email draft without starting from scratch | P0 |
| CP-7 | Any user | See the AI's response cite specific records and data points with clickable links | I can verify the AI's answer and navigate to source records | P0 |
| CP-8 | Any user | Have the AI understand which record/page I'm currently viewing | I can ask "summarize this deal" without specifying which one | P0 |
| CP-9 | Any user | See a confirmation dialog before the AI changes any CRM data | I never accidentally modify records | P0 |
| CP-10 | Any user | Access previous conversations in a chat history | I can reference earlier AI interactions | P1 |
| CP-11 | Any user | Pin the chat as a sidebar for extended conversations | I can work on records while chatting with the AI | P1 |
| CP-12 | Sales manager | Ask "Which of my team's deals are at risk and why?" | I can prioritize coaching and deal support | P1 |
| CP-13 | Any user | See suggested prompts/actions relevant to my current page | I know what to ask without thinking of prompts from scratch | P0 |

**Acceptance Criteria:**
- Cmd+K opens the AI chat overlay within 200ms
- First response streams within 2 seconds of query submission
- Supports natural language queries across all CRM objects (Contacts, Companies, Deals, Tasks, Notes, Emails)
- Supports record creation: "Create a [object] with [fields]" -- shows preview, requires confirmation
- Supports record updates: "Update [record] [field] to [value]" -- shows diff, requires confirmation
- Supports email drafting: generates contextual draft using CRM data, opens in email composer
- Context-aware: automatically knows the current page/record the user is viewing
- All responses include clickable record references
- Chat history is persisted per user (last 50 conversations)
- Suggested prompts update based on current page context
- Multi-turn conversations maintain context (follow-up questions work)
- Graceful handling of queries outside CRM scope ("I can help with CRM-related questions. For [topic], try [suggestion].")

**UI Specification:**
- **Trigger:** Cmd+K (macOS) / Ctrl+K (Windows/Linux), or click AI icon in left navigation
- **Overlay mode (default):** Centered modal with 600px max width, search-bar-style input at top, results below
- **Sidebar mode (pinned):** Right sidebar, 380px wide, shifts main content left (similar to Attio/Salesforce)
- **Input:** Single-line text field with send button, "Shift+Enter" for multiline
- **Suggested prompts:** 3-4 context-aware suggestions shown below input when empty (e.g., on Deal page: "Summarize this deal" | "Draft follow-up email" | "Show deal timeline")
- **Response rendering:** Markdown with rich elements (record cards, data tables, action buttons)
- **Confirmation dialogs:** For any CRM-changing action, show a structured diff ("Will create: Deal 'Acme Corp' | Amount: $50,000 | Stage: Negotiation") with "Confirm" and "Cancel" buttons
- **Loading state:** Streaming text with typing indicator
- **Chat history:** Accessible via "History" icon in chat panel, shows conversation list with timestamps

---

### 6.3 Feature: AI Email Drafting

**Description:** Context-aware email drafting powered by CRM data. Available both inline in the email composer and through the chat panel. The AI uses the contact's full history (emails, meetings, notes, deal stage) to generate relevant, personalized drafts.

**Competitive context:** HubSpot offers both inline (slash commands, text highlighting) and chat-based drafting. Salesforce does inline drafting. Attio only offers drafting through the chat panel (no inline). Folk does it through workflow automation. The inline approach (HubSpot style) gets higher adoption.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| ED-1 | Sales rep | Click "Draft with AI" in the email composer and get a contextual draft | I don't start from a blank page | P0 |
| ED-2 | Sales rep | Have the AI draft reference specific details from past interactions | The email feels personal, not templated | P0 |
| ED-3 | Sales rep | Select text in my draft and click "Improve" to refine it | I can polish specific sections without rewriting | P0 |
| ED-4 | Sales rep | Choose the tone (professional, casual, urgent, friendly) | The email matches the relationship and situation | P0 |
| ED-5 | Sales rep | Generate a meeting follow-up email that references what was discussed | I can send follow-ups in under a minute | P0 |
| ED-6 | Sales rep | Generate a cold outreach email based on the contact's company and role | I can personalize outreach at scale | P1 |
| ED-7 | Any user | Edit the AI draft freely and regenerate if needed | I maintain full control over what's sent | P0 |
| ED-8 | Any user | See what CRM data the AI used to draft the email | I can verify the context is accurate | P1 |
| ED-9 | RevOps admin | Configure email tone guidelines and templates for the workspace | All AI-drafted emails match our brand voice | P2 |

**Acceptance Criteria:**
- "Draft with AI" button visible in email composer
- Draft generates within 3 seconds
- Draft incorporates: contact name, company, role, recent interactions (last 5), deal context if applicable, any meeting notes
- Tone selector with 4 options: Professional, Casual, Urgent, Friendly
- "Improve" action available on text selection (rewrite, shorten, expand, change tone)
- Draft clearly marked as "AI-generated" until user edits
- Full edit capability -- user can modify any part of the draft
- "Regenerate" button for a fresh draft
- Works in all email contexts: new email, reply, forward
- Context sources shown in a collapsible "AI used: 3 emails, 1 meeting note, deal stage" indicator

**UI Specification:**
- **Location:** Inside email composer, toolbar button "Draft with AI" with sparkle icon
- **Draft flow:** Click button -> optional tone selection -> AI generates draft in composer body -> user edits
- **Inline improve:** Select text -> floating toolbar appears with: "Rewrite" | "Shorten" | "Expand" | "Change tone"
- **Context indicator:** Small collapsible section below draft showing data sources used
- **Loading state:** Shimmer effect in composer body while generating

---

### 6.4 Feature: Recommended Actions

**Description:** Context-aware action suggestions that appear on record pages, offering one-click AI-powered operations relevant to the current record's type and state. Inspired by Salesforce's recommended actions pattern, but embedded inline rather than only in a sidebar.

**Competitive context:** Salesforce surfaces recommended actions in the sidebar based on page context -- this is their best-rated UX pattern. HubSpot shows a "Summarize" button on records. Neither embeds these deeply inline.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| RA-1 | Sales rep | See 2-4 relevant AI actions on any record page | I can take smart actions with one click | P0 |
| RA-2 | Sales rep | See "Draft follow-up email" on a Contact after a recent meeting | I'm prompted to follow up at the right moment | P0 |
| RA-3 | Sales rep | See "Update deal stage" on a Deal that has been in the same stage for 2+ weeks | I'm nudged to update stale deals | P0 |
| RA-4 | Sales rep | See "Prepare meeting brief" on a Contact with an upcoming meeting | I can prep in one click | P0 |
| RA-5 | Sales manager | See "Review at-risk deals" on my pipeline view | I can quickly focus on deals needing attention | P1 |
| RA-6 | Any user | Dismiss an action I don't want | Irrelevant suggestions don't clutter my view | P0 |
| RA-7 | RevOps admin | Configure which actions appear for which record types/states | Actions match our sales process | P2 |

**Acceptance Criteria:**
- 2-4 action pills displayed below the record summary card
- Actions are context-aware based on: record type, record state, recent activity, upcoming events
- Each action executes with one click (opens the relevant AI flow -- e.g., email composer with draft, chat panel with pre-filled query)
- Actions refresh when record data changes
- Dismissible per user per record (don't show the same dismissed action again on same record)
- Default action sets per record type:
  - **Contact:** "Draft email" | "Prepare meeting brief" | "Enrich contact" | "View interaction history"
  - **Company:** "Summarize account" | "Show related deals" | "Research company"
  - **Deal:** "Draft follow-up" | "Identify risks" | "Update stage" | "Prepare close plan"
  - **Task:** "Get context" | "Draft response" | "Reschedule"

**UI Specification:**
- **Location:** Below the AI summary card, above the timeline
- **Visual design:** Row of pill-shaped buttons with icons, subtle AI indicator, matching Twenty's existing button styles
- **Interaction:** Click -> action executes (opens composer, chat panel, or inline result)
- **Dismiss:** Small "x" on hover for each pill
- **Overflow:** If more than 4 actions, show "More" dropdown

---

### 6.5 Feature: Natural Language Search

**Description:** AI-powered search that understands natural language queries across the entire CRM. Goes beyond keyword matching to understand intent, relationships, and context.

**Competitive context:** Attio supports NL queries through Ask Attio. HubSpot supports it through Breeze Assistant. Both are chat-based. Folk added semantic search across notes (Feb 2026). None offer it as a primary search experience integrated into the main search bar.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| NS-1 | Sales rep | Type "deals over $50K stuck in negotiation for more than 2 weeks" in search | I find at-risk deals without building a filter | P0 |
| NS-2 | Sales rep | Type "companies in healthcare that we talked to last month" | I can find records by natural language criteria | P0 |
| NS-3 | Sales rep | Type "who knows someone at Acme Corp" | I can find team connections to target accounts | P1 |
| NS-4 | Any user | See results grouped by object type (Contacts, Companies, Deals) | I can quickly find what I need | P0 |
| NS-5 | Any user | Click a result to navigate directly to that record | Search is a fast navigation tool | P0 |
| NS-6 | Any user | Fall back to standard keyword search if NL doesn't match | I don't lose existing search functionality | P0 |

**Acceptance Criteria:**
- NL search integrated into existing Cmd+K / search bar (shared with chat -- AI auto-detects intent: search vs. action vs. question)
- Results appear within 2 seconds
- Results show record cards with key fields visible
- Grouped by object type with counts
- Supports time-based queries ("last week", "this quarter", "before January")
- Supports numeric comparisons ("over $50K", "more than 10 employees")
- Supports relationship queries ("connected to", "worked with")
- Keyword search continues to work as before (fallback if NL parsing fails)
- Results include relevance scoring

---

### Phase 1 Summary

| Feature | Key Metric | Target |
|---------|-----------|--------|
| Record Summary Cards | Time to context on record page | <5 seconds (vs. 5-15 min manual) |
| AI Chat Panel | Queries answered without manual search | >70% |
| AI Email Drafting | Time to send follow-up email | <2 min (vs. 10-20 min manual) |
| Recommended Actions | Action click-through rate | >25% |
| Natural Language Search | Search success rate (found what needed) | >80% |

---

## 7. Phase 2 -- Differentiation: Intelligence Layer

**Goal:** Build the features that differentiate Twenty from every competitor. Focus on structured AI data (AI-powered fields), cross-dataset intelligence (pattern analysis, scoring), and external connectivity (enrichment, MCP).

**Timeline:** 10-12 weeks development + 2 weeks beta (starts after Phase 1 GA)

### 7.1 Feature: AI-Powered Fields

**Description:** Any custom field in Twenty can be designated as "AI-powered." An AI-powered field has a prompt template that defines what the AI should compute, and the field value is automatically populated and updated based on CRM data, web research, or other sources. AI field values are first-class data -- queryable, filterable, sortable, and reportable just like any other field.

**Competitive context:** This is the most architecturally interesting idea from the competitive research. Attio calls them "AI Attributes" and considers them a core differentiator. Folk calls them "AI Fields" / "Magic Fields." Neither Salesforce nor HubSpot offers this concept. Clay uses AI columns in their spreadsheet but it's not CRM-native.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| AF-1 | RevOps admin | Mark any custom field as "AI-powered" and define a prompt | AI automatically fills and maintains the field value | P0 |
| AF-2 | RevOps admin | Create an AI field "Company Summary" that auto-generates from web + CRM data | Every company record has an up-to-date overview | P0 |
| AF-3 | RevOps admin | Create an AI field "Lead Score" that evaluates contacts against our ICP | Leads are automatically scored without manual effort | P0 |
| AF-4 | Sales rep | See AI field values on records, in list views, and in pipeline views | AI insights are visible everywhere, not hidden in a chat | P0 |
| AF-5 | Sales rep | Filter and sort by AI field values | I can build views based on AI-generated data (e.g., "show high-score leads") | P0 |
| AF-6 | RevOps admin | Choose the data sources for an AI field (CRM data only, CRM + web, specific fields) | I control what data the AI uses | P1 |
| AF-7 | RevOps admin | Set the update frequency (on record view, daily, weekly, on-demand) | I balance freshness vs. cost | P1 |
| AF-8 | Any user | See the AI field's confidence level and last update timestamp | I know how reliable the value is | P0 |
| AF-9 | Any user | Click on an AI field value to see the reasoning and source data | I can verify and understand the AI's output | P1 |
| AF-10 | RevOps admin | Create an AI field "Industry Classification" that categorizes companies | Records are auto-categorized without manual tagging | P1 |
| AF-11 | RevOps admin | Create an AI field "Next Best Action" that recommends what to do next | Sales reps get AI-powered guidance per record | P2 |
| AF-12 | Any user | Override an AI field value manually | Human judgment takes precedence over AI | P0 |

**Acceptance Criteria:**
- Any field type (text, number, select, multi-select) can be AI-powered
- AI field configuration UI: prompt template, data sources, update frequency, model selection
- Prompt template supports variable interpolation: `{{contact.name}}`, `{{company.industry}}`, `{{deal.amount}}`, `{{recent_emails}}`, `{{recent_notes}}`
- AI field values appear identically to manual field values in all views (record, list, pipeline, filter, export)
- Small "AI" badge on AI-powered field values to indicate provenance
- Confidence indicator (high/medium/low) based on data availability and model certainty
- Last updated timestamp on every AI field value
- Click-to-expand showing: the prompt used, data sources referenced, model used, confidence reasoning
- Manual override: user can edit the value; overridden values are marked and not auto-updated until user clears the override
- Batch execution: AI fields compute for all records in a view, not just the currently open record
- Rate limiting: configurable maximum evaluations per hour/day to prevent runaway costs

**UI Specification:**
- **Field configuration:** In field settings modal, new toggle "AI-powered" -> reveals prompt editor, data source selector, frequency picker, model picker
- **Prompt editor:** Code-editor-style textarea with autocomplete for variables (`{{}}`) and syntax highlighting
- **In-view display:** Standard field value with small sparkle icon overlay in bottom-right corner
- **Expanded view:** Side panel showing prompt, sources, confidence, reasoning, and "Override" button
- **Bulk status:** In list views, "AI" column header badge showing "12/50 fields computed" with progress indicator

---

### 7.2 Feature: Cross-Dataset Analysis & Pipeline Intelligence

**Description:** AI that analyzes patterns across the entire CRM dataset, not just individual records. Surfaces insights like deal risk patterns, pipeline health, win/loss analysis, and team activity trends. Available through the chat panel and as proactive notifications.

**Competitive context:** This is the biggest whitespace in the market. No competitor does this well. Salesforce has limited forecast guidance. HubSpot has basic dashboard AI. Attio explicitly avoids it. Clay can do table-level analysis. Folk has nothing. This is Twenty's opportunity to differentiate.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| CA-1 | Sales manager | Ask "What do my closed-won deals have in common?" and get pattern analysis | I can replicate success patterns | P0 |
| CA-2 | Sales manager | Ask "Which deals are at risk and why?" and get a prioritized risk list | I can focus coaching on the right deals | P0 |
| CA-3 | Sales manager | See a weekly pipeline health summary delivered proactively | I stay informed without running manual reports | P0 |
| CA-4 | Sales rep | Ask "How does this deal compare to similar deals we've won?" | I can gauge win probability based on real data | P1 |
| CA-5 | Sales manager | Ask "Where are deals getting stuck in our pipeline?" | I can identify process bottlenecks | P0 |
| CA-6 | Sales manager | Ask "What's the average time in each deal stage for won vs. lost deals?" | I can set realistic timeline expectations | P1 |
| CA-7 | RevOps admin | Ask "What fields are most correlated with deal wins?" | I can optimize our CRM data model | P1 |
| CA-8 | Sales manager | See an AI-generated deal score (0-100) on every deal based on historical patterns | I can prioritize at a glance | P0 |
| CA-9 | Any user | See trend analysis ("Deal velocity is 15% slower this quarter vs. last") | I understand directional changes | P1 |
| CA-10 | Sales manager | Get proactive alerts when a deal's pattern matches historical lost-deal patterns | I can intervene before it's too late | P2 |

**Acceptance Criteria:**
- Cross-dataset queries work through the chat panel
- Analysis covers: win/loss patterns, deal velocity, stage duration, activity correlation, field value correlations
- Deal scoring: 0-100 score displayed on every deal record, updated daily
- Score explanation: click to see factors (stage duration, activity recency, contact engagement, deal size comparison, etc.)
- Pipeline health summary: generated weekly, shows total pipeline, win probability weighted forecast, at-risk deals, stalled deals, new deals, key changes
- Results include data points: "Based on analysis of 247 closed deals over the last 12 months"
- Minimum data requirements: at least 20 closed deals for pattern analysis (show clear message if insufficient data)
- Proactive pipeline health notifications: opt-in, configurable frequency (daily/weekly)
- Visualization support: simple charts (bar, line) rendered inline in chat responses where relevant

**UI Specification:**
- **Deal Score:** Displayed as a colored badge (green/yellow/red) on deal records, list views, and pipeline cards
- **Score detail:** Click badge -> popover showing score breakdown with factor weights and comparison to average
- **Pipeline Health:** Delivered as a structured notification card with key metrics, trend arrows, and "View details" link opening chat with full analysis
- **Chat visualizations:** Simple, inline charts (rendered as SVG in chat) for trend data, stage duration distributions, etc.

---

### 7.3 Feature: Data Enrichment

**Description:** AI-powered data enrichment that automatically fills missing contact, company, and deal fields using external data sources. Combines structured data providers with AI web research for comprehensive coverage.

**Competitive context:** Clay leads with 150+ providers and waterfall enrichment. HubSpot has 200M+ profiles via Breeze Intelligence. Attio uses a Web Research Agent. Folk uses People Data Labs + Perplexity. Twenty should offer a focused enrichment experience that leverages the waterfall concept but doesn't try to out-breadth Clay.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| DE-1 | Sales rep | Click "Enrich" on a Contact to fill missing fields (email, phone, title, LinkedIn) | I have complete contact data without manual research | P0 |
| DE-2 | Sales rep | Click "Enrich" on a Company to fill missing fields (industry, size, revenue, website, description) | I understand the company without leaving Twenty | P0 |
| DE-3 | RevOps admin | Configure which data providers to use and in what priority order (waterfall) | I control data quality and cost | P0 |
| DE-4 | RevOps admin | Set up auto-enrichment on record creation | New records are enriched automatically | P1 |
| DE-5 | Any user | See enrichment source and confidence per field | I know where the data came from and how reliable it is | P0 |
| DE-6 | Sales rep | Enrich multiple records at once from a list view | I can enrich an entire lead list efficiently | P1 |
| DE-7 | Any user | See an "AI Research" enrichment option that searches the web when structured providers have no data | I get data even for less-known companies | P1 |
| DE-8 | RevOps admin | Set monthly enrichment limits | I control costs predictably | P0 |
| DE-9 | Any user | Review enrichment results before they're saved to the record | I can reject inaccurate data | P1 |

**Acceptance Criteria:**
- One-click enrichment on Contact and Company records
- Waterfall provider logic: try providers in configured priority order, stop at first successful result per field
- Supported providers (Phase 2 launch): at least 3 integrations (e.g., Clearbit/People Data Labs + Hunter + AI web research)
- AI web research fallback: when structured providers return nothing, AI agent searches the web and extracts data
- Enrichment results show: value, source provider, confidence level, timestamp
- Bulk enrichment: select records in list view -> "Enrich selected" -> progress indicator -> results
- Auto-enrichment: configurable trigger on record creation or field update
- Monthly usage tracking with configurable limits
- Review mode (optional): enriched values shown in "pending" state until user approves
- GDPR compliance: enrichment respects data privacy settings, does not enrich contacts who have opted out

**UI Specification:**
- **Single record:** "Enrich" button in record actions menu with sparkle icon
- **Enrichment results:** Inline field update with source badge (e.g., "via Clearbit" or "via AI Research")
- **Bulk enrichment:** List view toolbar action "Enrich (N selected)" -> modal showing progress and results
- **Configuration:** Settings page with provider list (drag to reorder priority), API key inputs, monthly limit slider
- **Usage dashboard:** Simple view showing enrichments used this month / limit, by provider

---

### 7.4 Feature: AI-Powered Workflow Building

**Description:** Create and modify CRM workflows using natural language. Users describe what they want to automate, and the AI generates the workflow configuration. Also supports AI steps within workflows (classify, summarize, draft, research).

**Competitive context:** Salesforce's "Agentforce for Flow" generates Flows from natural language. HubSpot's "Build with AI" helps construct workflows. Clay's Sculptor builds enrichment workflows conversationally. Attio has AI steps within workflows. This is a high-value, high-differentiation feature.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| WF-1 | RevOps admin | Describe a workflow in natural language and have AI generate it | I can create automations without deep technical knowledge | P0 |
| WF-2 | RevOps admin | Say "When a deal moves to Negotiation, send a Slack notification to the sales manager" | I automate team notifications conversationally | P0 |
| WF-3 | RevOps admin | Say "When a new contact is created, enrich their data and send a welcome email" | I automate onboarding workflows easily | P1 |
| WF-4 | RevOps admin | Add an "AI Step" in a workflow that classifies, summarizes, or drafts content | Workflows include AI-powered logic | P1 |
| WF-5 | RevOps admin | Review and edit the AI-generated workflow before activating it | I maintain control over automation logic | P0 |
| WF-6 | Any user | Ask "What workflows are currently active?" and get a summary | I can understand our automation setup | P1 |
| WF-7 | RevOps admin | Ask "Modify the deal notification workflow to also include deals over $100K" | I can update existing workflows conversationally | P2 |

**Acceptance Criteria:**
- Natural language workflow generation through the chat panel
- AI generates a visual workflow preview matching Twenty's workflow builder format
- User reviews and edits the generated workflow before activation
- Supported workflow elements: triggers (record create/update/delete, field change, stage change, time-based), conditions (field value, record type), actions (update field, create record, send email, send notification, webhook, AI step)
- AI steps in workflows: "Classify" (categorize based on criteria), "Summarize" (generate text summary), "Draft" (generate email/message), "Research" (enrich via web), "Score" (evaluate against criteria)
- Generated workflows are standard Twenty workflows (not special AI workflows) -- fully editable in the visual builder
- Validation: AI warns if a generated workflow has logical issues (infinite loops, missing conditions)

---

### 7.5 Feature: MCP Server

**Description:** Model Context Protocol server that exposes Twenty's CRM data and AI capabilities to external AI tools (ChatGPT, Claude, Raycast, Slack bots, custom agents). Enables users to query and act on their CRM from any AI-powered interface.

**Competitive context:** Attio shipped their MCP server in Feb 2026. HubSpot has both MCP server and client. Clay is available in ChatGPT/Claude/Codex via MCP. Salesforce supports MCP and A2A. MCP is table stakes for 2026 CRM.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| MCP-1 | Sales rep | Query my Twenty CRM from ChatGPT/Claude using natural language | I can access CRM insights from tools I already use | P0 |
| MCP-2 | Sales rep | Create/update Twenty records from external AI tools | I can manage my CRM without opening Twenty | P0 |
| MCP-3 | Developer | Connect custom AI agents to Twenty via MCP | I can build AI workflows that read/write CRM data | P0 |
| MCP-4 | RevOps admin | Control which MCP operations are allowed per user/role | External access respects our security model | P0 |
| MCP-5 | Developer | Access Twenty's AI features (summarize, enrich, score) via MCP | External tools can leverage Twenty's intelligence | P1 |
| MCP-6 | Any user | Use Twenty in Slack by mentioning a bot | I can query CRM data without leaving Slack | P2 |

**Acceptance Criteria:**
- MCP server exposes: read records, search records, create records, update records, get record summary, get pipeline status
- Authentication: API key or OAuth2 per user/workspace
- Permission-aware: MCP actions respect workspace roles and permissions
- Rate limiting: configurable per API key
- Compatible with: Claude Desktop, ChatGPT (via plugin/connector), Raycast, and any MCP-compatible client
- Documentation: auto-generated API docs with usage examples
- Audit logging: all MCP actions logged with user, action, timestamp, and source client

---

### 7.6 Feature: Proactive Follow-Up Recommendations

**Description:** AI that monitors email and activity patterns to detect stalled conversations and recommend follow-ups. Inspired by Folk's Follow-up Assistant -- the highest-rated purpose-built assistant pattern.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| FU-1 | Sales rep | Get a daily notification listing contacts/deals that need follow-up | I never let important conversations go cold | P0 |
| FU-2 | Sales rep | See a pre-drafted follow-up message for each recommendation | I can follow up in one click | P0 |
| FU-3 | Sales rep | Have the AI draft in my tone/writing style based on past emails | Follow-ups feel personal, not robotic | P1 |
| FU-4 | Sales rep | Dismiss a follow-up recommendation with a reason (already handled, not relevant) | The AI learns my preferences | P1 |
| FU-5 | Sales rep | Configure follow-up sensitivity (aggressive, moderate, conservative) | The cadence matches my selling style | P1 |
| FU-6 | Sales manager | See a team-level follow-up dashboard showing pending follow-ups per rep | I can ensure no deals fall through the cracks | P2 |

**Acceptance Criteria:**
- Analyzes sent emails and identifies conversations where: the last message was outbound with no reply for N days (configurable, default 3), or a meeting occurred with no follow-up email sent
- Daily digest notification (in-app) with prioritized follow-up list
- Each recommendation includes: contact name, last interaction summary, suggested follow-up message, urgency indicator
- Follow-up message is personalized using contact context and recent interaction content
- Dismiss with reason: "Already handled" | "Not relevant" | "Snooze 3 days"
- Follow-up sensitivity configurable per user: aggressive (2+ days), moderate (3-5 days), conservative (7+ days)
- Does not recommend follow-ups for contacts marked as unsubscribed or inactive

---

### Phase 2 Summary

| Feature | Key Metric | Target |
|---------|-----------|--------|
| AI-Powered Fields | Field accuracy (user override rate) | <20% override |
| Cross-Dataset Analysis | Manager adoption rate | >60% of managers weekly |
| Data Enrichment | Field completion rate increase | >50% |
| NL Workflow Building | Workflow creation time | <5 min (vs. 30+ min manual) |
| MCP Server | External AI integration count | >100 connected workspaces |
| Follow-Up Recommendations | Follow-up completion rate | >50% of recommendations acted on |

---

## 8. Phase 3 -- Expansion: Autonomous & Multi-Surface

**Goal:** Extend Twenty AI from an assistant to an autonomous teammate that works proactively across multiple surfaces. Build capabilities that no other open-source CRM offers.

**Timeline:** 12-16 weeks development + 4 weeks beta (starts after Phase 2 GA)

### 8.1 Feature: Autonomous AI Agents

**Description:** AI agents that operate independently within defined guardrails, executing multi-step workflows without user prompting. Unlike the assistive AI of Phases 1-2 (user asks, AI helps), agents monitor conditions, detect opportunities, and take action.

**Competitive context:** Salesforce leads with Agentforce (proactive/ambient agents, multi-agent orchestration). HubSpot has 6+ GA agents. Attio and Folk are semi-autonomous at best. This is where Twenty can leapfrog the modern CRM competitors (Attio, Folk) while offering Salesforce-level capability without Salesforce-level complexity.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| AA-1 | RevOps admin | Create an agent that auto-qualifies new leads based on our ICP criteria | Leads are scored and routed automatically | P0 |
| AA-2 | RevOps admin | Create an agent that monitors deal health and alerts reps when deals show risk patterns | At-risk deals are caught early | P0 |
| AA-3 | RevOps admin | Create an agent that auto-enriches new contacts on creation | Every new contact has complete data without manual effort | P0 |
| AA-4 | Sales rep | Configure a personal agent that prepares meeting briefs before every scheduled call | I walk into every meeting prepared | P1 |
| AA-5 | RevOps admin | Create an agent that cleans data (normalizes titles, merges duplicates, flags inconsistencies) | CRM data quality improves automatically | P1 |
| AA-6 | RevOps admin | Define guardrails for each agent (what it can/cannot do, when it needs approval) | Agents operate safely within boundaries | P0 |
| AA-7 | Any user | See an agent activity log showing what each agent has done | I can audit and understand agent behavior | P0 |
| AA-8 | RevOps admin | Pause, resume, or modify an agent at any time | I maintain full control | P0 |
| AA-9 | RevOps admin | Create custom agents from templates or from scratch using natural language | I can automate any recurring workflow | P1 |
| AA-10 | Sales manager | Create an agent that generates weekly pipeline reports and sends them to the team | Reporting is automated | P2 |

**Acceptance Criteria:**
- Agent builder UI: define trigger conditions, agent capabilities (actions), guardrails, and approval requirements
- Pre-built agent templates: Lead Qualification, Deal Risk Monitor, Auto-Enrichment, Data Cleanup, Meeting Prep
- Agent guardrails: action whitelist (what the agent can do), approval gates (actions requiring human confirmation), rate limits (max actions per hour/day), scope (which records/objects the agent can access)
- Agent activity log: timestamped log of every action taken, with reasoning, outcome, and affected records
- Agent states: Active, Paused, Draft
- Agent testing: "Dry run" mode that shows what the agent would do without actually executing
- Agent metrics: actions taken, success rate, time saved estimate
- Multi-agent coordination: agents can trigger other agents (e.g., enrichment agent triggers scoring agent)
- Agent actions available: create/update/delete records, send emails (with approval), send notifications, trigger webhooks, call AI (summarize, classify, draft, research, score), and update AI fields

**UI Specification:**
- **Agent builder:** Full-page editor with: trigger definition, action flow (visual), guardrail configuration, test panel
- **Agent library:** Card grid showing all agents with status badges (Active/Paused/Draft), last run, success metrics
- **Agent activity feed:** Timeline view of agent actions with filters (by agent, action type, date range)
- **Agent notifications:** In-app alerts when agents take significant actions or request approval

---

### 8.2 Feature: Call Intelligence

**Description:** AI-powered call recording, transcription, and analysis. Extracts key information from calls including action items, decisions, objections, and sentiment. Integrates with the record timeline and feeds into AI fields and cross-dataset analysis.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| CI-1 | Sales rep | Record a call and get an AI-generated transcript and summary | I don't need to take manual notes during calls | P0 |
| CI-2 | Sales rep | See extracted action items and decisions from a call | I know exactly what to do next | P0 |
| CI-3 | Sales rep | Have call summaries automatically posted to the relevant contact/deal timeline | CRM records stay up to date without manual entry | P0 |
| CI-4 | Sales manager | See call analytics: talk ratio, questions asked, objections raised | I can coach reps based on data | P1 |
| CI-5 | Sales rep | Ask the AI "What did [Contact] say about pricing in our last call?" | I can recall specific conversation details instantly | P1 |
| CI-6 | Sales rep | Get an auto-drafted follow-up email based on call content | Post-call follow-up takes seconds, not minutes | P1 |
| CI-7 | RevOps admin | Configure call analysis templates (MEDDPICC, BANT, CHAMP) | Call insights match our sales methodology | P1 |
| CI-8 | Sales rep | See call sentiment analysis (positive/neutral/negative moments) | I understand how the conversation went beyond my own perception | P2 |

**Acceptance Criteria:**
- Call recording via built-in VoIP integration or meeting platform connectors (Zoom, Google Meet, Teams)
- Transcription accuracy: >95% for English, >90% for supported additional languages
- Summary generated within 2 minutes of call end
- Action items extracted and optionally converted to Tasks in Twenty
- Call data feeds into: record timeline, AI summary cards, cross-dataset analysis, AI fields
- MEDDPICC/BANT/CHAMP extraction templates (configurable)
- Search across call transcripts via natural language ("What did Contact say about budget?")
- Call recording storage: configurable retention period, user-controlled deletion
- Consent handling: configurable disclosure ("This call is being recorded") with opt-out support
- Privacy: transcripts stored with same security as other CRM data, accessible only to authorized users

---

### 8.3 Feature: Multi-Surface AI (Slack, Mobile, Browser Extension)

**Description:** Extend Twenty's AI to surfaces outside the CRM application, so AI assistance follows users wherever they work.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| MS-1 | Sales rep | Query my CRM from Slack by mentioning @twenty | I get CRM context without leaving Slack | P0 |
| MS-2 | Sales rep | Get deal update notifications in Slack with AI-generated context | I stay informed in my primary communication tool | P0 |
| MS-3 | Sales rep | Use Twenty AI on my phone with voice input | I can update CRM and get context on the go | P1 |
| MS-4 | Sales rep | Use a Chrome extension that enriches LinkedIn profiles with Twenty CRM data | I see CRM context while prospecting | P1 |
| MS-5 | Sales rep | Use the Chrome extension to add LinkedIn contacts to Twenty with one click | I capture leads without manual data entry | P1 |
| MS-6 | Sales rep | Get meeting prep briefs pushed to my phone before scheduled calls | I'm prepared even when away from my desk | P2 |

**Acceptance Criteria:**
- **Slack integration:** @twenty bot in Slack channels that supports: record queries, record creation, deal updates, AI summaries, follow-up reminders
- **Mobile:** AI assistant accessible in Twenty mobile app with text and voice input, push notifications for proactive AI (follow-ups, deal alerts, meeting prep)
- **Chrome extension:** Shows CRM data overlay on LinkedIn profiles (contact exists in CRM, last interaction, deal status), one-click "Add to Twenty" with auto-enrichment
- All surfaces use the same AI backend with consistent responses
- Authentication: SSO/OAuth2 for all external surfaces
- Permissions: external surface actions respect workspace roles

---

### 8.4 Feature: Self-Hosted AI / Local Models

**Description:** Support for running AI features with self-hosted or local LLM models, enabling full data sovereignty. This is Twenty's unique differentiator that no competitor can match.

**User Stories:**

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| SH-1 | Developer | Configure Twenty to use a self-hosted LLM (Ollama, vLLM, llama.cpp) | My CRM data never leaves my infrastructure | P0 |
| SH-2 | Enterprise admin | Run all AI features using our own API keys (OpenAI, Anthropic, etc.) | We control costs and data processing directly | P0 |
| SH-3 | Developer | Choose which model to use per AI feature (e.g., fast model for summaries, powerful model for analysis) | I optimize cost vs. quality per feature | P1 |
| SH-4 | Enterprise admin | Run AI completely offline with local models | We meet air-gapped security requirements | P2 |
| SH-5 | Developer | Add custom model providers via a standard interface | I can use any model, including fine-tuned ones | P1 |

**Acceptance Criteria:**
- Model provider configuration in settings: API endpoint, API key, model name, for each provider
- Supported providers: OpenAI API, Anthropic API, Google Vertex AI, Ollama (local), any OpenAI-compatible endpoint
- Per-feature model assignment: admin can configure which model handles which AI feature
- Fallback chain: if primary model fails, try secondary model
- Performance monitoring: response time, error rate, cost tracking per provider
- All AI features work with any supported provider (graceful degradation if model capabilities differ)
- Documentation: self-hosting guide with recommended models per feature and hardware requirements

---

### Phase 3 Summary

| Feature | Key Metric | Target |
|---------|-----------|--------|
| Autonomous Agents | Active agents per workspace | >3 average |
| Call Intelligence | Calls processed per rep per week | >10 |
| Multi-Surface AI | External surface DAU / total DAU | >25% |
| Self-Hosted AI | Self-hosted deployments using AI | >30% of self-hosted installs |

---

## 9. Architecture & Technical Design

### 9.1 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      AI GATEWAY LAYER                        │
│  (Request routing, rate limiting, caching, audit logging)    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Chat     │  │ Summary  │  │ Email    │  │ Agent    │   │
│  │ Engine   │  │ Engine   │  │ Engine   │  │ Engine   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │         │
│  ┌────┴──────────────┴──────────────┴──────────────┴────┐   │
│  │              CONTEXT LAYER                            │   │
│  │  (CRM data indexing, semantic search, record graph)   │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────┴───────────────────────────────┐   │
│  │              MODEL ROUTER                             │   │
│  │  (Provider selection, fallback, cost optimization)    │   │
│  └──────┬──────────┬──────────┬──────────┬──────────┘   │
│         │          │          │          │               │
│    ┌────┴───┐ ┌────┴───┐ ┌────┴───┐ ┌────┴───┐        │
│    │OpenAI  │ │Anthropic│ │Google  │ │Ollama  │        │
│    │API     │ │API      │ │Vertex  │ │(local) │        │
│    └────────┘ └─────────┘ └────────┘ └────────┘        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                    DATA LAYER                            │
│  PostgreSQL (CRM data) │ Redis (cache) │ Vector DB      │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Context Layer** | Vector embeddings (pgvector) + structured queries | Combines semantic search with precise CRM queries |
| **Model Interface** | OpenAI-compatible API standard | Maximum model portability; works with Ollama, vLLM, and most providers |
| **Streaming** | Server-Sent Events (SSE) | Native browser support, simple implementation, works with all reverse proxies |
| **AI Field Computation** | Background job queue (BullMQ) | Prevents blocking, enables batching, respects rate limits |
| **Agent Execution** | Event-driven state machine | Deterministic control flow with LLM decision points (hybrid reasoning) |
| **MCP Server** | TypeScript, Streamable HTTP transport | Standard MCP protocol, compatible with Claude Desktop and all MCP clients |
| **Caching** | Redis with TTL per feature | Reduces LLM calls for repeated queries (e.g., same record summary viewed by multiple users) |
| **Audit Logging** | Append-only PostgreSQL table | Immutable log of all AI actions for compliance and debugging |

### 9.3 Context Layer Design

The Context Layer is the core intelligence infrastructure. It provides every AI feature with relevant CRM context.

**Data indexed:**
- All CRM records (contacts, companies, deals, tasks) with field values
- Email content (subject, body, participants, timestamps)
- Notes and activity logs
- Meeting data (if call intelligence is active)
- Relationship graph (contact <-> company <-> deal connections)

**Indexing strategy:**
- Real-time: record create/update triggers re-indexing of affected records
- Batch: nightly full re-index for consistency
- Selective: only index fields/objects that are AI-enabled (configurable)

**Query types:**
- Semantic: "deals similar to Acme Corp" (vector similarity)
- Structured: "deals > $50K in Negotiation stage" (SQL query generation)
- Hybrid: "high-value deals that went cold recently" (vector + structured)

### 9.4 Privacy Architecture

```
User Request → AI Gateway → PII Detection → [Mask PII] → LLM Provider
                                                              │
LLM Response ← AI Gateway ← PII Restoration ← [Unmask PII] ←┘
```

- PII masking: sensitive fields (email, phone, SSN) are masked before sending to external LLMs
- Self-hosted models bypass PII masking (data never leaves the infrastructure)
- No CRM data used for model training (contractual with all providers)
- Data retention: AI interaction logs stored for configurable duration (default 90 days), deletable on demand

---

## 10. Pricing & Packaging Strategy

### 10.1 Core Principle
**AI is included, not add-on.** Based on competitive research, the #1 complaint across competitors is unpredictable AI pricing (credit anxiety). Twenty's pricing advantage is simplicity.

### 10.2 Proposed Pricing Model

| Feature | Self-Hosted (BYOK) | Cloud Free | Cloud Pro | Cloud Enterprise |
|---------|--------------------|-----------|-----------|--------------------|
| Record Summary Cards | Unlimited | 100/mo | Unlimited | Unlimited |
| AI Chat Panel | Unlimited | 50 queries/mo | Unlimited | Unlimited |
| AI Email Drafting | Unlimited | 20 drafts/mo | Unlimited | Unlimited |
| Recommended Actions | Unlimited | Included | Included | Included |
| NL Search | Unlimited | Included | Included | Included |
| AI-Powered Fields | Unlimited | 5 fields | 25 fields | Unlimited |
| Cross-Dataset Analysis | Unlimited | Basic | Full | Full + custom |
| Data Enrichment | BYOK providers | 100/mo | 500/mo | Custom |
| MCP Server | Included | Not included | Included | Included |
| Autonomous Agents | Unlimited | Not included | 3 agents | Unlimited |
| Call Intelligence | Unlimited | Not included | 100 hours/mo | Unlimited |
| Self-Hosted Models | Full support | N/A | N/A | N/A |
| Model Choice | Full | Default only | Choose from 3 | All + custom |

### 10.3 Key Pricing Decisions

1. **BYOK (Bring Your Own Key) is unlimited**: Self-hosted users provide their own API keys and pay their provider directly. Twenty charges nothing extra for AI features.
2. **Cloud Free tier has meaningful AI**: 100 summaries, 50 chat queries, 20 email drafts per month is enough for a solo user or small team to experience value.
3. **Cloud Pro includes most features without per-use metering**: Fixed monthly price, no credit system. Limits are generous enough that most teams won't hit them.
4. **No shared credit pool**: Each feature has its own limit. Using enrichment doesn't reduce your summary quota.
5. **Enterprise is truly unlimited**: For teams with high volume, no caps, no surprises.

---

## 11. Trust, Privacy & Transparency

### 11.1 Trust Principles

1. **Never modify data without confirmation**: All CRM-changing actions require explicit user approval
2. **Never train on customer data**: Contractual guarantee with all model providers; self-hosted bypasses providers entirely
3. **Always show provenance**: Every AI output shows what data was used, which model generated it, and confidence level
4. **Always respect permissions**: AI only accesses data the requesting user has permission to see
5. **Always allow override**: Users can override any AI output; human judgment takes precedence

### 11.2 Technical Controls

| Control | Description |
|---------|-------------|
| PII masking | Sensitive fields masked before external LLM calls |
| Audit logging | Every AI action logged (immutable, exportable) |
| Permission enforcement | AI queries filtered by user's workspace role/permissions |
| Data residency | Self-hosted deployments keep all data local |
| Model provider isolation | No data shared between workspaces; no cross-tenant context |
| Consent management | AI features can be disabled per workspace or per user |
| Retention policies | AI logs deletable on demand; configurable auto-deletion |

### 11.3 AI Disclosure

- All AI-generated content labeled with "AI-generated" indicator
- AI field values show sparkle icon to distinguish from human-entered values
- Chat responses cite data sources with clickable links
- Summary cards show "Last generated" timestamp and data source count
- Email drafts marked "Draft by AI" until user edits

---

## 12. Success Metrics

### 12.1 North Star Metric
**AI-Assisted Actions per Active User per Week**: The number of meaningful CRM actions (emails sent, records updated, deals progressed) that were assisted or initiated by AI. Target: >5 per user per week by Phase 2 GA.

### 12.2 Phase-Specific Metrics

**Phase 1 Metrics:**

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| AI feature activation | % of workspaces that enable AI | >80% | Weekly |
| Weekly active AI users | Users who interact with any AI feature weekly | >40% of active users | Weekly |
| Summary card engagement | % of record page views where summary is visible (not collapsed) | >70% | Daily |
| Chat query volume | Queries per active user per week | >3 | Weekly |
| Email draft adoption | % of emails sent that used AI drafting | >25% | Weekly |
| Recommended action CTR | % of displayed actions clicked | >25% | Weekly |
| NL search success | % of NL searches that return relevant results (measured by click-through) | >80% | Weekly |
| Time to value | Time from workspace AI activation to first meaningful AI action | <15 minutes | Per workspace |

**Phase 2 Metrics:**

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| AI field adoption | AI-powered fields created per workspace | >5 average | Monthly |
| AI field accuracy | % of AI field values NOT manually overridden | >80% | Monthly |
| Deal score engagement | % of deals with viewed deal scores | >60% | Weekly |
| Enrichment completion | % of new records auto-enriched within 24h | >70% | Daily |
| MCP connections | Workspaces with active MCP integrations | >100 | Monthly |
| Follow-up completion | % of recommended follow-ups acted on | >50% | Weekly |
| Pipeline health reads | Managers who read weekly pipeline summary | >60% of managers | Weekly |

**Phase 3 Metrics:**

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| Active agents per workspace | Average running agents | >3 | Monthly |
| Agent action success rate | % of agent actions that complete without error or rollback | >95% | Daily |
| Multi-surface DAU ratio | Users accessing AI outside the web CRM / total AI users | >25% | Weekly |
| Call intelligence adoption | Calls recorded per rep per week (among enabled workspaces) | >10 | Weekly |
| Self-hosted AI deployments | Self-hosted installs with active AI configuration | >30% of self-hosted | Monthly |

### 12.3 Quality Metrics (All Phases)

| Metric | Target | Red Flag |
|--------|--------|----------|
| AI output edit rate (before use) | <30% | >50% |
| AI error rate (hallucinations, wrong data) | <5% | >10% |
| Latency: summary generation | <3s | >5s |
| Latency: chat response (first token) | <2s | >4s |
| Latency: email draft | <3s | >5s |
| User satisfaction (in-product survey) | >4.0/5 | <3.5/5 |

---

## 13. Risk Assessment & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **AI output quality is generic/wrong** | High | High | CRM-specific prompt engineering; aggressive context injection; confidence levels; human-in-the-loop for all actions |
| **Users don't adopt (low engagement)** | Medium | High | Ambient/inline AI (no new behavior to learn); free tier; onboarding walkthrough; "AI benefits" dashboard |
| **LLM costs erode margins** | Medium | Medium | Caching (Redis); BYOK model; prompt optimization; model routing (fast model for simple tasks, powerful for complex) |
| **Competitors ship faster** | High | Medium | Focus on fewer, polished features; lean into open-source/self-hosted differentiator; ship Phase 1 fast |
| **Data quality limits AI value** | High | High | Graceful degradation; data completeness indicators; enrichment suggestions; never hallucinate missing data |
| **Credit/pricing becomes a pain point** | Medium | High | No credit system; simple per-feature limits; BYOK is unlimited |
| **Privacy/compliance concerns** | Medium | High | PII masking; self-hosted option; no training on customer data; SOC 2 compliance target |
| **Model provider outages** | Medium | Medium | Multi-provider fallback chain; self-hosted option eliminates dependency |
| **AI feature scope creep** | High | Medium | Strict phase boundaries; feature freeze per phase; kill underperforming features |
| **Security vulnerabilities (prompt injection, data leaks)** | Low | Critical | Input sanitization; output validation; permission enforcement; security audit before each phase GA |

---

## 14. Timeline & Milestones

### Phase 1 -- MVP: Core AI Assistant
| Milestone | Target Date | Description |
|-----------|------------|-------------|
| Architecture design complete | Week 2 | Context Layer, Model Router, AI Gateway design finalized |
| Record Summary Cards alpha | Week 4 | Internal testing with real workspace data |
| AI Chat Panel alpha | Week 5 | Basic NL queries and CRM actions working |
| Email Drafting alpha | Week 6 | Context-aware drafting in composer |
| Recommended Actions alpha | Week 7 | Context-aware action pills on record pages |
| NL Search alpha | Week 8 | Integrated into Cmd+K experience |
| Phase 1 beta (internal) | Week 9 | All Phase 1 features integrated, internal dogfooding |
| Phase 1 beta (external) | Week 10 | Limited external beta with 10-20 workspaces |
| **Phase 1 GA** | **Week 12** | General availability |

### Phase 2 -- Differentiation: Intelligence Layer
| Milestone | Target Date | Description |
|-----------|------------|-------------|
| AI-Powered Fields alpha | Phase 1 GA + Week 3 | Field configuration UI + basic computation |
| Cross-Dataset Analysis alpha | Phase 1 GA + Week 5 | Deal scoring + pipeline health |
| Data Enrichment alpha | Phase 1 GA + Week 6 | Single-record enrichment with 2+ providers |
| NL Workflow Building alpha | Phase 1 GA + Week 8 | Basic workflow generation from natural language |
| MCP Server alpha | Phase 1 GA + Week 8 | Read operations + basic CRM actions |
| Follow-Up Recommendations alpha | Phase 1 GA + Week 9 | Email scanning + daily digest |
| Phase 2 beta | Phase 1 GA + Week 10 | Integrated beta |
| **Phase 2 GA** | **Phase 1 GA + Week 14** | General availability |

### Phase 3 -- Expansion: Autonomous & Multi-Surface
| Milestone | Target Date | Description |
|-----------|------------|-------------|
| Autonomous Agents alpha | Phase 2 GA + Week 4 | Agent builder + 2 pre-built templates |
| Call Intelligence alpha | Phase 2 GA + Week 6 | Recording + transcription + basic summary |
| Slack Integration alpha | Phase 2 GA + Week 8 | @twenty bot with basic queries |
| Chrome Extension alpha | Phase 2 GA + Week 10 | LinkedIn overlay + one-click add |
| Self-Hosted Models support | Phase 2 GA + Week 10 | Ollama + OpenAI-compatible endpoint support |
| Phase 3 beta | Phase 2 GA + Week 12 | Integrated beta |
| **Phase 3 GA** | **Phase 2 GA + Week 16** | General availability |

---

## 15. Open Questions

| # | Question | Owner | Decision Needed By |
|---|----------|-------|--------------------|
| 1 | Which LLM provider(s) do we integrate first? Recommendation: Anthropic (Claude) as primary, OpenAI as secondary, Ollama for self-hosted | Engineering | Phase 1 Week 1 |
| 2 | Do we build the vector search layer on pgvector (PostgreSQL) or a dedicated vector DB (Pinecone, Weaviate)? | Engineering | Phase 1 Week 1 |
| 3 | What is the minimum data threshold for cross-dataset analysis? (Proposed: 20 closed deals) | Product + Data | Phase 2 start |
| 4 | Which enrichment providers do we integrate first? | Product + Partnerships | Phase 2 start |
| 5 | Do we need SOC 2 Type II compliance before Phase 1 GA? | Legal + Security | Phase 1 Week 4 |
| 6 | What is our position on AI-generated content in emails (should we disclose to recipients)? | Legal + Product | Phase 1 Week 6 |
| 7 | How do we handle AI features for workspaces with very little data (< 10 records)? | Product + Design | Phase 1 Week 4 |
| 8 | Should autonomous agents be able to send emails without human approval? | Product + Legal | Phase 3 start |
| 9 | What call recording consent laws apply in which jurisdictions, and how do we handle multi-jurisdiction calls? | Legal | Phase 3 start |
| 10 | Do we build our own Slack app or use a third-party integration framework? | Engineering | Phase 3 start |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **AI-Powered Field** | A CRM field whose value is automatically computed by AI based on a prompt template and CRM data |
| **Context Layer** | The backend system that indexes, retrieves, and assembles CRM data for AI features |
| **Model Router** | The component that selects which LLM provider/model handles a given AI request |
| **AI Gateway** | The API layer that handles authentication, rate limiting, caching, and audit logging for all AI operations |
| **MCP (Model Context Protocol)** | An open standard for connecting AI models to external data sources and tools |
| **BYOK (Bring Your Own Key)** | Users provide their own LLM API keys, allowing unlimited AI usage at their own cost |
| **Ambient AI** | AI that surfaces insights proactively in the user's workflow without requiring explicit interaction |
| **Guardrails** | Boundaries that constrain what an autonomous AI agent can do (action whitelist, approval gates, scope limits) |
| **Waterfall Enrichment** | Sequential data lookup across multiple providers, stopping at first successful result per field |
| **Deal Score** | AI-generated 0-100 score predicting deal health based on historical patterns |

## Appendix B: Competitive Research Reference

See companion document: [AI Assistant Competitor Research](./ai-assistant-competitor-research.md)

---

*This PRD is a living document. It will be updated as we make decisions on open questions, learn from beta testing, and respond to market changes.*
