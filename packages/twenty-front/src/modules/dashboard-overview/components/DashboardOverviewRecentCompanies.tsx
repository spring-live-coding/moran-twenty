import { DashboardOverviewCard } from '@/dashboard-overview/components/DashboardOverviewCard';
import { DASHBOARD_RECENT_COMPANIES } from '@/dashboard-overview/constants/DashboardOverviewData';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useContext } from 'react';
import { IconBuildingSkyscraper } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

const StyledTitle = styled.div`
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledRow = styled.div`
  align-items: center;
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  padding: ${themeCssVariables.spacing[2]} 0;

  &:first-of-type {
    border-top: 0;
  }
`;

const StyledName = styled.span`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledCity = styled.span`
  color: ${themeCssVariables.font.color.secondary};
`;

const StyledOwner = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
`;

export const DashboardOverviewRecentCompanies = () => {
  const { t } = useLingui();
  const { theme } = useContext(ThemeContext);

  return (
    <DashboardOverviewCard>
      <StyledTitle>{t`Recently added companies`}</StyledTitle>
      <div>
        {DASHBOARD_RECENT_COMPANIES.map(({ name, city, owner }) => (
          <StyledRow key={name}>
            <StyledName>
              <IconBuildingSkyscraper size={theme.icon.size.sm} />
              {name}
            </StyledName>
            <StyledCity>{city}</StyledCity>
            <StyledOwner>{owner}</StyledOwner>
          </StyledRow>
        ))}
      </div>
    </DashboardOverviewCard>
  );
};
