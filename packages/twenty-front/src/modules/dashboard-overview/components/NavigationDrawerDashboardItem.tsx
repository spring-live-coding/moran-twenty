import { DASHBOARD_OVERVIEW_PATH } from '@/dashboard-overview/constants/DashboardOverviewData';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { useLingui } from '@lingui/react/macro';
import { useLocation } from 'react-router-dom';
import { IconLayoutDashboard } from 'twenty-ui/display';

export const NavigationDrawerDashboardItem = () => {
  const { t } = useLingui();
  const location = useLocation();

  return (
    <NavigationDrawerSection>
      <NavigationDrawerItem
        label={t`Dashboard`}
        to={DASHBOARD_OVERVIEW_PATH}
        Icon={IconLayoutDashboard}
        active={location.pathname === DASHBOARD_OVERVIEW_PATH}
      />
    </NavigationDrawerSection>
  );
};
