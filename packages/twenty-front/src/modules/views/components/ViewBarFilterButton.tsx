import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { StyledHeaderDropdownButton } from '@/ui/layout/dropdown/components/StyledHeaderDropdownButton';
import { isDropdownOpenComponentState } from '@/ui/layout/dropdown/states/isDropdownOpenComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { ViewBarFilterDropdownIds } from '@/views/constants/ViewBarFilterDropdownIds';
import { Trans } from '@lingui/react/macro';

export const ViewBarFilterButton = () => {
  const { objectNamePlural } = useRecordIndexContextOrThrow();

  const isDropdownOpen = useAtomComponentStateValue(
    isDropdownOpenComponentState,
    ViewBarFilterDropdownIds.MAIN,
  );

  return (
    <StyledHeaderDropdownButton isUnfolded={isDropdownOpen}>
      {objectNamePlural === 'companies' ? (
        <Trans>Filter companies</Trans>
      ) : (
        <Trans>Filter</Trans>
      )}
    </StyledHeaderDropdownButton>
  );
};
