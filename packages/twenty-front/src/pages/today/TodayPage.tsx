import { useContext } from 'react';

import { styled } from '@linaria/react';
import { ResponsiveLine } from '@nivo/line';

import { currentUserState } from '@/auth/states/currentUserState';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import {
  IconArrowsSort,
  IconHome,
  IconRefresh,
  IconTrendingDown,
  IconTrendingUp,
} from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

// --- helpers ---

const getGreeting = (firstName: string): string => {
  const hour = new Date().getHours();
  const name = firstName || 'there';
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 18) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
};

const getFormattedDate = (): string =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

// --- layout ---

const StyledScrollContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[5]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[6]};
`;

const StyledDashboardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing['0.5']};
`;

const StyledGreeting = styled.h1`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xxl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin: 0;
`;

const StyledSubline = styled.p`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.regular};
  margin: 0;
`;

// --- highlights row ---

const StyledHighlightsRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(3, 1fr);
`;

const StyledMetricCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.md};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  padding: ${themeCssVariables.spacing[4]};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${themeCssVariables.border.color.medium};
  }
`;

const StyledMetricTitle = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledMetricBottom = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const StyledMetricValue = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xxl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledDeltaContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  padding-bottom: ${themeCssVariables.spacing['0.5']};
`;

// --- pipeline chart data ---

const PIPELINE_DATA = [
  {
    id: 'pipeline',
    data: [
      { x: 'Oct', y: 182 },
      { x: 'Nov', y: 215 },
      { x: 'Dec', y: 198 },
      { x: 'Jan', y: 274 },
      { x: 'Feb', y: 248 },
      { x: 'Mar', y: 306 },
      { x: 'Apr', y: 288 },
      { x: 'May', y: 312 },
    ],
  },
];

// --- pipeline chart sub-component ---

const StyledChartWrapper = styled.div`
  height: 180px;
  width: 100%;
`;

const PipelineChart = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledChartWrapper>
      <ResponsiveLine
        data={PIPELINE_DATA}
        margin={{ top: 10, right: 16, bottom: 32, left: 56 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 400 }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
          tickValues: 5,
          format: (v: number) => `$${v}K`,
        }}
        enableGridX={false}
        enableGridY={true}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.08}
        colors={[theme.color.blue]}
        lineWidth={2}
        theme={{
          background: 'transparent',
          text: {
            fontSize: 11,
            fill: theme.font.color.tertiary,
            fontFamily: theme.font.family,
          },
          grid: {
            line: {
              stroke: theme.border.color.light,
              strokeWidth: 1,
            },
          },
          axis: {
            ticks: {
              text: {
                fill: theme.font.color.tertiary,
                fontSize: 11,
              },
            },
          },
        }}
      />
    </StyledChartWrapper>
  );
};

// --- full-width chart card ---

const StyledChartCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledChartHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${themeCssVariables.spacing[4]};
`;

const StyledChartTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledChartCaption = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledChartArea = styled.div`
  background: ${themeCssVariables.background.secondary};
  border-radius: ${themeCssVariables.border.radius.sm};
  height: 160px;
  position: relative;
  width: 100%;
`;

const StyledChartPlaceholderText = styled.span`
  bottom: 50%;
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.sm};
  left: 50%;
  position: absolute;
  transform: translate(-50%, 50%);
`;

// --- two-column layout ---

const StyledColumnsRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: 1fr 380px;
`;

const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

// --- widget cards ---

const StyledWidgetCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledWidgetHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${themeCssVariables.spacing[3]};
`;

const StyledWidgetTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${themeCssVariables.font.color.tertiary};
  cursor: pointer;
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.xs};
  padding: 0;

  &:hover {
    color: ${themeCssVariables.font.color.primary};
  }
`;

const StyledEmptyState = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${themeCssVariables.spacing[8]} 0;
`;

const StyledEmptyStateText = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

// --- list item rows ---

const StyledTaskRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[3]} 0;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTaskCheckbox = styled.input`
  cursor: pointer;
  flex-shrink: 0;
`;

const StyledTaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledTaskTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  display: block;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  margin-bottom: ${themeCssVariables.spacing['0.5']};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTaskMeta = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledDealRow = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]} 0;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledDealIcon = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.secondary};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  height: 32px;
  justify-content: center;
  width: 32px;
`;

const StyledDealInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledDealTitle = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  margin-bottom: ${themeCssVariables.spacing['0.5']};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDealSubtitle = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledDealAmount = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  flex-shrink: 0;
`;

const StyledActivityRow = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[2]} 0;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledActivityDot = styled.div`
  background: ${themeCssVariables.color.blue};
  border-radius: 50%;
  flex-shrink: 0;
  height: 8px;
  margin-top: 6px;
  width: 8px;
`;

const StyledActivityText = styled.div`
  flex: 1;
  font-size: ${themeCssVariables.font.size.xs};
  line-height: 1.4;
`;

const StyledActivityTime = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  display: block;
  font-size: ${themeCssVariables.font.size.xxs};
  margin-top: ${themeCssVariables.spacing['0.5']};
`;

// --- metric card sub-component ---

type MetricCardProps = {
  title: string;
  value: string;
  deltaLabel: string;
  isPositive: boolean;
};

const MetricCard = ({
  title,
  value,
  deltaLabel,
  isPositive,
}: MetricCardProps) => {
  const { theme } = useContext(ThemeContext);
  const deltaColor = isPositive ? theme.color.turquoise8 : theme.color.red8;

  return (
    <StyledMetricCard>
      <StyledMetricTitle>{title}</StyledMetricTitle>
      <StyledMetricBottom>
        <StyledMetricValue>{value}</StyledMetricValue>
        {deltaLabel !== '' && (
          <StyledDeltaContainer>
            {isPositive ? (
              <IconTrendingUp color={deltaColor} size={theme.icon.size.md} />
            ) : (
              <IconTrendingDown color={deltaColor} size={theme.icon.size.md} />
            )}
            <span
              style={{
                color: deltaColor,
                fontSize: themeCssVariables.font.size.xs,
                fontWeight: themeCssVariables.font.weight.medium,
              }}
            >
              {deltaLabel}
            </span>
          </StyledDeltaContainer>
        )}
      </StyledMetricBottom>
    </StyledMetricCard>
  );
};

// --- main page component ---

export const TodayPage = () => {
  const currentUser = useAtomStateValue(currentUserState);
  const firstName = currentUser?.firstName ?? '';

  return (
    <PageContainer>
      <PageHeader title="Today" Icon={IconHome}>
        <Button
          title="Refresh data"
          Icon={IconRefresh}
          variant="primary"
          size="small"
          accent="blue"
        />
        <Button
          title="Reorder"
          Icon={IconArrowsSort}
          variant="tertiary"
          size="small"
        />
      </PageHeader>
      <PageBody>
      <StyledScrollContainer>
        {/* Personal header */}
        <StyledDashboardHeader>
            <StyledGreeting>{getGreeting(firstName)}</StyledGreeting>
            <StyledSubline>{getFormattedDate()}</StyledSubline>
        </StyledDashboardHeader>

        {/* Highlights row */}
        <StyledHighlightsRow>
          <MetricCard
            title="Open deals"
            value="—"
            deltaLabel=""
            isPositive={true}
          />
          <MetricCard
            title="Pipeline value"
            value="—"
            deltaLabel=""
            isPositive={true}
          />
          <MetricCard
            title="Win rate"
            value="—"
            deltaLabel=""
            isPositive={true}
          />
        </StyledHighlightsRow>

        {/* Pipeline value over time */}
        <StyledChartCard>
          <StyledChartHeader>
            <StyledChartTitle>Pipeline value over time</StyledChartTitle>
            <StyledChartCaption>Last 8 months</StyledChartCaption>
          </StyledChartHeader>
          <PipelineChart />
        </StyledChartCard>

        {/* Two-column widget layout */}
        <StyledColumnsRow>
          <StyledLeftColumn>
            {/* My Tasks */}
            <StyledWidgetCard>
              <StyledWidgetHeader>
                <StyledWidgetTitle>My Tasks</StyledWidgetTitle>
                <StyledViewAllButton>View all</StyledViewAllButton>
              </StyledWidgetHeader>
              <StyledTaskRow>
                <StyledTaskCheckbox type="checkbox" />
                <StyledTaskContent>
                  <StyledTaskTitle>Schedule call with Acme</StyledTaskTitle>
                  <StyledTaskMeta>Today · High</StyledTaskMeta>
                </StyledTaskContent>
              </StyledTaskRow>
              <StyledTaskRow>
                <StyledTaskCheckbox type="checkbox" />
                <StyledTaskContent>
                  <StyledTaskTitle>Update proposal for TechCorp</StyledTaskTitle>
                  <StyledTaskMeta>Today · Medium</StyledTaskMeta>
                </StyledTaskContent>
              </StyledTaskRow>
              <StyledTaskRow>
                <StyledTaskCheckbox type="checkbox" />
                <StyledTaskContent>
                  <StyledTaskTitle>Follow up on quote</StyledTaskTitle>
                  <StyledTaskMeta>Tomorrow · Low</StyledTaskMeta>
                </StyledTaskContent>
              </StyledTaskRow>
            </StyledWidgetCard>

            {/* Deals needing attention */}
            <StyledWidgetCard>
              <StyledWidgetHeader>
                <StyledWidgetTitle>Deals needing attention</StyledWidgetTitle>
                <StyledViewAllButton>View all</StyledViewAllButton>
              </StyledWidgetHeader>
              <StyledDealRow>
                <StyledDealIcon>AC</StyledDealIcon>
                <StyledDealInfo>
                  <StyledDealTitle>Acme — Platform Integration</StyledDealTitle>
                  <StyledDealSubtitle>No activity 9 days · Proposal</StyledDealSubtitle>
                </StyledDealInfo>
                <StyledDealAmount>$250K</StyledDealAmount>
              </StyledDealRow>
              <StyledDealRow>
                <StyledDealIcon>TC</StyledDealIcon>
                <StyledDealInfo>
                  <StyledDealTitle>TechCorp — License renewal</StyledDealTitle>
                  <StyledDealSubtitle>Stalled 14 days · Negotiation</StyledDealSubtitle>
                </StyledDealInfo>
                <StyledDealAmount>$180K</StyledDealAmount>
              </StyledDealRow>
              <StyledDealRow>
                <StyledDealIcon>GB</StyledDealIcon>
                <StyledDealInfo>
                  <StyledDealTitle>Global Brands — Implementation</StyledDealTitle>
                  <StyledDealSubtitle>Closing this week · Closing</StyledDealSubtitle>
                </StyledDealInfo>
                <StyledDealAmount>$420K</StyledDealAmount>
              </StyledDealRow>
            </StyledWidgetCard>
          </StyledLeftColumn>

          <StyledRightColumn>
            {/* Recent activity */}
            <StyledWidgetCard>
              <StyledWidgetHeader>
                <StyledWidgetTitle>Recent activity</StyledWidgetTitle>
                <StyledViewAllButton>View all</StyledViewAllButton>
              </StyledWidgetHeader>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  Completed task "Follow up on quote"
                  <StyledActivityTime>2 hours ago</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  Added note to Acme deal
                  <StyledActivityTime>4 hours ago</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  Updated contact info for TechCorp
                  <StyledActivityTime>1 day ago</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
            </StyledWidgetCard>

            {/* Customers by location */}
            <StyledWidgetCard>
              <StyledWidgetHeader>
                <StyledWidgetTitle>Customers by location</StyledWidgetTitle>
              </StyledWidgetHeader>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  <strong>San Francisco, CA</strong>
                  <StyledActivityTime>4 customers</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  <strong>New York, NY</strong>
                  <StyledActivityTime>3 customers</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
              <StyledActivityRow>
                <StyledActivityDot />
                <StyledActivityText>
                  <strong>Austin, TX</strong>
                  <StyledActivityTime>2 customers</StyledActivityTime>
                </StyledActivityText>
              </StyledActivityRow>
            </StyledWidgetCard>
          </StyledRightColumn>
        </StyledColumnsRow>
      </StyledScrollContainer>
      </PageBody>
    </PageContainer>
  );
};
