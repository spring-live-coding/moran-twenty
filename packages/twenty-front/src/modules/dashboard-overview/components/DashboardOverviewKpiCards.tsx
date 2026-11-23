import { DashboardOverviewCard } from '@/dashboard-overview/components/DashboardOverviewCard';
import { DASHBOARD_KPIS } from '@/dashboard-overview/constants/DashboardOverviewData';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useContext } from 'react';
import {
  IconBuildingSkyscraper,
  type IconComponent,
  IconCurrencyDollar,
  IconTargetArrow,
  IconUsers,
} from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

const StyledGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(4, 1fr);
`;

const StyledLabel = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledValueRow = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const StyledValue = styled.div`
  font-size: ${themeCssVariables.font.size.xxl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledDelta = styled.div`
  color: ${themeCssVariables.tag.text.green};
  font-size: ${themeCssVariables.font.size.sm};
`;

const KPI_ICONS: Record<(typeof DASHBOARD_KPIS)[number]['key'], IconComponent> =
  {
    companies: IconBuildingSkyscraper,
    people: IconUsers,
    opportunities: IconTargetArrow,
    pipeline: IconCurrencyDollar,
  };

export const DashboardOverviewKpiCards = () => {
  const { t } = useLingui();
  const { theme } = useContext(ThemeContext);

  const labels: Record<(typeof DASHBOARD_KPIS)[number]['key'], string> = {
    companies: t`Companies`,
    people: t`People`,
    opportunities: t`Open opportunities`,
    pipeline: t`Pipeline value`,
  };

  return (
    <StyledGrid>
      {DASHBOARD_KPIS.map((kpi) => {
        const Icon = KPI_ICONS[kpi.key];

        return (
          <DashboardOverviewCard key={kpi.key}>
            <StyledLabel>
              <Icon size={theme.icon.size.sm} />
              {labels[kpi.key]}
            </StyledLabel>
            <StyledValueRow>
              <StyledValue>{kpi.value}</StyledValue>
              <StyledDelta>{kpi.delta}</StyledDelta>
            </StyledValueRow>
          </DashboardOverviewCard>
        );
      })}
    </StyledGrid>
  );
};
