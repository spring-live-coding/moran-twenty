import { DEFAULT_TODAY_DASHBOARD_PAGE_LAYOUT_ID } from '@/page-layout/constants/DefaultTodayDashboardPageLayoutId';
import { useSetIsPageLayoutInEditMode } from '@/page-layout/hooks/useSetIsPageLayoutInEditMode';
import { isDashboardInEditModeComponentState } from '@/page-layout/states/isDashboardInEditModeComponentState';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { IconLayoutGrid, IconRefresh, IconSun } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const TodayPersonalHeader = () => {
  const { setIsPageLayoutInEditMode } = useSetIsPageLayoutInEditMode(
    DEFAULT_TODAY_DASHBOARD_PAGE_LAYOUT_ID,
  );

  const isEditMode = useAtomComponentStateValue(
    isDashboardInEditModeComponentState,
    DEFAULT_TODAY_DASHBOARD_PAGE_LAYOUT_ID,
  );

  const handleReorder = () => {
    setIsPageLayoutInEditMode(!isEditMode);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <PageHeader title={getGreeting()} Icon={IconSun}>
      <Button
        title="Refresh"
        variant="tertiary"
        size="small"
        Icon={IconRefresh}
        onClick={handleRefresh}
      />
      <Button
        title={isEditMode ? 'Done' : 'Reorder'}
        variant={isEditMode ? 'primary' : 'secondary'}
        size="small"
        Icon={IconLayoutGrid}
        onClick={handleReorder}
      />
    </PageHeader>
  );
};
