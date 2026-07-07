import { NavigationDrawerOpenedSection } from '@/navigation-menu-item/display/sections/components/NavigationDrawerOpenedSection';
import { NavigationDrawerWorkspaceSectionSkeletonLoader } from '@/object-metadata/components/NavigationDrawerWorkspaceSectionSkeletonLoader';

import { isLayoutCustomizationModeEnabledState } from '@/layout-customization/states/isLayoutCustomizationModeEnabledState';
import { NavigationDrawerOtherSection } from '@/navigation/components/NavigationDrawerOtherSection';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useLingui } from '@lingui/react/macro';
import { styled } from '@linaria/react';
import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { IconChartBar } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const DASHBOARD_PAGE_PATH = '/dashboard';

const FavoritesSectionDispatcher = lazy(() =>
  import('@/navigation-menu-item/display/sections/favorites/components/FavoritesSectionDispatcher').then(
    (module) => ({
      default: module.FavoritesSectionDispatcher,
    }),
  ),
);

const WorkspaceSectionDispatcher = lazy(() =>
  import('@/navigation-menu-item/display/sections/workspace/components/WorkspaceSectionDispatcher').then(
    (module) => ({
      default: module.WorkspaceSectionDispatcher,
    }),
  ),
);

const StyledScrollableItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

export const MainNavigationDrawerScrollableItems = () => {
  const { t } = useLingui();
  const location = useLocation();
  const isLayoutCustomizationModeEnabled = useAtomStateValue(
    isLayoutCustomizationModeEnabledState,
  );

  return (
    <StyledScrollableItemsContainer>
      <NavigationDrawerSection>
        <NavigationDrawerItem
          label={t`Dashboard`}
          Icon={IconChartBar}
          to={DASHBOARD_PAGE_PATH}
          active={location.pathname === DASHBOARD_PAGE_PATH}
        />
      </NavigationDrawerSection>
      <NavigationDrawerOpenedSection />
      <Suspense fallback={<NavigationDrawerWorkspaceSectionSkeletonLoader />}>
        <FavoritesSectionDispatcher />
        <WorkspaceSectionDispatcher />
      </Suspense>
      {!isLayoutCustomizationModeEnabled && <NavigationDrawerOtherSection />}
    </StyledScrollableItemsContainer>
  );
};
