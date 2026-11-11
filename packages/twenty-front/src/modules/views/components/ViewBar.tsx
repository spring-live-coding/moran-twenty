import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { type ReactNode } from 'react';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { ObjectSortDropdownButton } from '@/object-record/object-sort-dropdown/components/ObjectSortDropdownButton';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { TopBar } from '@/ui/layout/top-bar/components/TopBar';
import { QueryParamsFiltersEffect } from '@/views/components/QueryParamsFiltersEffect';
import { QueryParamsSortsEffect } from '@/views/components/QueryParamsSortsEffect';
import { ViewBarPageTitle } from '@/views/components/ViewBarPageTitle';
import { ViewPickerDropdown } from '@/views/view-picker/components/ViewPickerDropdown';

import { ObjectFilterDropdownComponentInstanceContext } from '@/object-record/object-filter-dropdown/states/contexts/ObjectFilterDropdownComponentInstanceContext';
import { VIEW_SORT_DROPDOWN_ID } from '@/object-record/object-sort-dropdown/constants/ViewSortDropdownId';
import { ObjectSortDropdownComponentInstanceContext } from '@/object-record/object-sort-dropdown/states/context/ObjectSortDropdownComponentInstanceContext';
import { QueryParamsCleanupEffect } from '@/views/components/QueryParamsCleanupEffect';
import { ViewBarAnyFieldFilterEffect } from '@/views/components/ViewBarAnyFieldFilterEffect';
import { ViewBarFilterDropdown } from '@/views/components/ViewBarFilterDropdown';
import { ViewBarRecordFieldEffect } from '@/views/components/ViewBarRecordFieldEffect';
import { ViewBarRecordFilterEffect } from '@/views/components/ViewBarRecordFilterEffect';
import { ViewBarRecordFilterGroupEffect } from '@/views/components/ViewBarRecordFilterGroupEffect';
import { ViewBarRecordSortEffect } from '@/views/components/ViewBarRecordSortEffect';
import { ViewBarFilterDropdownIds } from '@/views/constants/ViewBarFilterDropdownIds';
import { UpdateViewButtonGroup } from './UpdateViewButtonGroup';
import { ViewBarDetails } from './ViewBarDetails';

const StyledViewPickerWithHelper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHelperText = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.regular};
  line-height: ${themeCssVariables.text.lineHeight.md};
  padding-left: ${themeCssVariables.spacing[6]};
  white-space: nowrap;
`;

type ViewBarProps = {
  viewBarId: string;
  className?: string;
  optionsDropdownButton: ReactNode;
  isReadOnly?: boolean;
};

export const ViewBar = ({
  viewBarId,
  className,
  optionsDropdownButton,
  isReadOnly = false,
}: ViewBarProps) => {
  const { objectNamePlural } = useRecordIndexContextOrThrow();

  if (!objectNamePlural) {
    return;
  }

  if (isReadOnly) {
    return (
      <TopBar className={className} leftComponent={<ViewPickerDropdown />} />
    );
  }

  return (
    <ObjectSortDropdownComponentInstanceContext.Provider
      value={{ instanceId: VIEW_SORT_DROPDOWN_ID }}
    >
      <ViewBarRecordFilterGroupEffect />
      <ViewBarAnyFieldFilterEffect />
      <ViewBarRecordFieldEffect />
      <ViewBarRecordFilterEffect />
      <ViewBarRecordSortEffect />
      <QueryParamsFiltersEffect />
      <QueryParamsSortsEffect />
      <QueryParamsCleanupEffect />
      <ViewBarPageTitle />
      <TopBar
        className={className}
        leftComponent={
          objectNamePlural === 'companies' ? (
            <StyledViewPickerWithHelper>
              <ViewPickerDropdown />
              <StyledHelperText>{t`Every company in your workspace`}</StyledHelperText>
            </StyledViewPickerWithHelper>
          ) : (
            <ViewPickerDropdown />
          )
        }
        rightComponent={
          <>
            <ObjectFilterDropdownComponentInstanceContext.Provider
              value={{ instanceId: ViewBarFilterDropdownIds.MAIN }}
            >
              <ViewBarFilterDropdown />
            </ObjectFilterDropdownComponentInstanceContext.Provider>
            <ObjectSortDropdownButton />
            {optionsDropdownButton}
          </>
        }
        bottomComponent={
          <ViewBarDetails
            hasFilterButton
            viewBarId={viewBarId}
            objectNamePlural={objectNamePlural}
            rightComponent={<UpdateViewButtonGroup />}
          />
        }
      />
    </ObjectSortDropdownComponentInstanceContext.Provider>
  );
};
