import { DashboardOverviewCard } from '@/dashboard-overview/components/DashboardOverviewCard';
import {
  DASHBOARD_LARGEST_COMPANIES,
  DASHBOARD_NEW_COMPANIES_PER_MONTH,
} from '@/dashboard-overview/constants/DashboardOverviewData';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const CHART_WIDTH = 664;
const CHART_HEIGHT = 220;
const CHART_PADDING_X = 24;
const CHART_BASELINE_Y = 190;
const CHART_UNIT_HEIGHT = 1.8;
const CHART_GRID_LINES_Y = [190, 135, 80, 25];

const StyledGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: 2fr 1fr;
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledCardTitle = styled.div`
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledCardHint = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledChart = styled.svg`
  display: block;
  height: auto;
  width: 100%;
`;

const StyledBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledBarLabel = styled.div`
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  justify-content: space-between;
  margin-bottom: ${themeCssVariables.spacing[1]};
`;

const StyledBarName = styled.span`
  color: ${themeCssVariables.font.color.secondary};
`;

const StyledBarValue = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
`;

const StyledBarTrack = styled.div`
  background: ${themeCssVariables.background.transparent.lighter};
  border-radius: ${themeCssVariables.border.radius.pill};
  height: 6px;
`;

const StyledBarFill = styled.div`
  background: ${themeCssVariables.color.blue};
  border-radius: ${themeCssVariables.border.radius.pill};
  height: 6px;
`;

export const DashboardOverviewCharts = () => {
  const { t } = useLingui();

  const stepX =
    (CHART_WIDTH - CHART_PADDING_X * 2) /
    (DASHBOARD_NEW_COMPANIES_PER_MONTH.length - 1);

  const points = DASHBOARD_NEW_COMPANIES_PER_MONTH.map(
    ({ month, count }, index) => ({
      month,
      x: CHART_PADDING_X + index * stepX,
      y: CHART_BASELINE_Y - count * CHART_UNIT_HEIGHT,
    }),
  );

  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(' ');
  const areaPoints = `${CHART_PADDING_X},${CHART_BASELINE_Y} ${linePoints} ${points[points.length - 1].x},${CHART_BASELINE_Y}`;

  const maxEmployees = Math.max(
    ...DASHBOARD_LARGEST_COMPANIES.map(({ employees }) => employees),
  );

  return (
    <StyledGrid>
      <DashboardOverviewCard>
        <StyledCardHeader>
          <StyledCardTitle>{t`New companies per month`}</StyledCardTitle>
          <StyledCardHint>{t`Last 8 months`}</StyledCardHint>
        </StyledCardHeader>
        <StyledChart viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
          <g stroke={themeCssVariables.border.color.light} strokeWidth={1}>
            {CHART_GRID_LINES_Y.map((y) => (
              <line
                key={y}
                x1={CHART_PADDING_X}
                x2={CHART_WIDTH - CHART_PADDING_X}
                y1={y}
                y2={y}
              />
            ))}
          </g>
          <polygon
            points={areaPoints}
            fill={themeCssVariables.accent.tertiary}
            opacity={0.6}
          />
          <polyline
            points={linePoints}
            fill="none"
            stroke={themeCssVariables.color.blue}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <g
            fill={themeCssVariables.background.primary}
            stroke={themeCssVariables.color.blue}
            strokeWidth={2}
          >
            {points.map(({ month, x, y }) => (
              <circle key={month} cx={x} cy={y} r={3} />
            ))}
          </g>
          <g
            fill={themeCssVariables.font.color.light}
            fontSize={11}
            textAnchor="middle"
          >
            {points.map(({ month, x }) => (
              <text key={month} x={x} y={212}>
                {month}
              </text>
            ))}
          </g>
        </StyledChart>
      </DashboardOverviewCard>
      <DashboardOverviewCard>
        <StyledCardHeader>
          <StyledCardTitle>{t`Largest companies`}</StyledCardTitle>
          <StyledCardHint>{t`Employees`}</StyledCardHint>
        </StyledCardHeader>
        <StyledBars>
          {DASHBOARD_LARGEST_COMPANIES.map(({ name, employees }) => (
            <div key={name}>
              <StyledBarLabel>
                <StyledBarName>{name}</StyledBarName>
                <StyledBarValue>
                  {employees.toLocaleString('en-US')}
                </StyledBarValue>
              </StyledBarLabel>
              <StyledBarTrack>
                <StyledBarFill
                  style={{ width: `${(employees / maxEmployees) * 100}%` }}
                />
              </StyledBarTrack>
            </div>
          ))}
        </StyledBars>
      </DashboardOverviewCard>
    </StyledGrid>
  );
};
