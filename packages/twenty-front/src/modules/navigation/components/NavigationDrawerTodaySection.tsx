import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { IconSun } from 'twenty-ui/display';
import { useLocation } from 'react-router-dom';

const TODAY_PATH = '/today';

export const NavigationDrawerTodaySection = () => {
  const location = useLocation();
  const isActive = location.pathname === TODAY_PATH;

  return (
    <NavigationDrawerSection>
      <NavigationDrawerItem
        label="Today"
        Icon={IconSun}
        to={TODAY_PATH}
        active={isActive}
      />
    </NavigationDrawerSection>
  );
};
