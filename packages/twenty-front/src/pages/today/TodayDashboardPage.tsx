import { CommandMenuComponentInstanceContext } from '@/command-menu/states/contexts/CommandMenuComponentInstanceContext';
import { MAIN_CONTEXT_STORE_INSTANCE_ID } from '@/context-store/constants/MainContextStoreInstanceId';
import { ContextStoreComponentInstanceContext } from '@/context-store/states/contexts/ContextStoreComponentInstanceContext';
import { MainContainerLayoutWithSidePanel } from '@/object-record/components/MainContainerLayoutWithSidePanel';
import { DEFAULT_TODAY_DASHBOARD_PAGE_LAYOUT_ID } from '@/page-layout/constants/DefaultTodayDashboardPageLayoutId';
import { PageLayoutRenderer } from '@/page-layout/components/PageLayoutRenderer';
import { TodayPersonalHeader } from '@/today/components/TodayPersonalHeader';
import { LayoutRenderingProvider } from '@/ui/layout/contexts/LayoutRenderingContext';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageLayoutType } from '~/generated-metadata/graphql';

// TODO: Once the backend exposes ensurePersonalDashboard mutation, fetch the
//       real per-user DASHBOARD pageLayoutId here instead of using the mock.
const TODAY_PAGE_LAYOUT_ID = DEFAULT_TODAY_DASHBOARD_PAGE_LAYOUT_ID;

export const TodayDashboardPage = () => {
  return (
    <PageContainer>
      <ContextStoreComponentInstanceContext.Provider
        value={{ instanceId: MAIN_CONTEXT_STORE_INSTANCE_ID }}
      >
        <CommandMenuComponentInstanceContext.Provider
          value={{ instanceId: TODAY_PAGE_LAYOUT_ID }}
        >
          <TodayPersonalHeader />
          <LayoutRenderingProvider
            value={{
              targetRecordIdentifier: undefined,
              layoutType: PageLayoutType.DASHBOARD,
              isInSidePanel: false,
            }}
          >
            <MainContainerLayoutWithSidePanel>
              <PageLayoutRenderer pageLayoutId={TODAY_PAGE_LAYOUT_ID} />
            </MainContainerLayoutWithSidePanel>
          </LayoutRenderingProvider>
        </CommandMenuComponentInstanceContext.Provider>
      </ContextStoreComponentInstanceContext.Provider>
    </PageContainer>
  );
};
