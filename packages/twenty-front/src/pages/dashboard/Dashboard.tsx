import { DashboardOverviewCharts } from '@/dashboard-overview/components/DashboardOverviewCharts';
import { DashboardOverviewKpiCards } from '@/dashboard-overview/components/DashboardOverviewKpiCards';
import { DashboardOverviewRecentCompanies } from '@/dashboard-overview/components/DashboardOverviewRecentCompanies';
import { PageBody } from '@/ui/layout/page/components/PageBody';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { PageTitle } from '@/ui/utilities/page-title/components/PageTitle';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { IconLayoutDashboard, IconPlus } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledHeading = styled.div`
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledSubHeading = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  margin-top: ${themeCssVariables.spacing[1]};
`;

export const Dashboard = () => {
  const { t } = useLingui();

  return (
    <PageContainer>
      <PageTitle title={t`Dashboard`} />
      <PageHeader title={t`Dashboard`} Icon={IconLayoutDashboard}>
        <Button
          Icon={IconPlus}
          title={t`Add widget`}
          variant="secondary"
          size="small"
        />
      </PageHeader>
      <PageBody>
        <StyledContent>
          <div>
            <StyledHeading>{t`Dashboard`}</StyledHeading>
            <StyledSubHeading>{t`A quick overview of your workspace activity.`}</StyledSubHeading>
          </div>
          <DashboardOverviewKpiCards />
          <DashboardOverviewCharts />
          <DashboardOverviewRecentCompanies />
        </StyledContent>
      </PageBody>
    </PageContainer>
  );
};
