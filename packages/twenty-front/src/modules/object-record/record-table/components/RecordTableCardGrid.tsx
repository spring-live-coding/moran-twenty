import { useObjectPermissionsForObject } from '@/object-record/hooks/useObjectPermissionsForObject';
import { hasAnySoftDeleteFilterOnViewComponentSelector } from '@/object-record/record-filter/states/hasAnySoftDeleteFilterOnView';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { useUpsertRecordsInStore } from '@/object-record/record-store/hooks/useUpsertRecordsInStore';
import { RecordTableCardGridCard } from '@/object-record/record-table/components/RecordTableCardGridCard';
import { useRecordTableContextOrThrow } from '@/object-record/record-table/contexts/RecordTableContext';
import { useCreateNewIndexRecord } from '@/object-record/record-table/hooks/useCreateNewIndexRecord';
import { isRecordTableCellsNonEditableComponentState } from '@/object-record/record-table/states/isRecordTableCellsNonEditableComponentState';
import { isRecordTableCreateDisabled } from '@/object-record/record-table/utils/isRecordTableCreateDisabled';
import { RecordTableVirtualizedDataChangedEffect } from '@/object-record/record-table/virtualization/components/RecordTableVirtualizedDataChangedEffect';
import { useLoadRecordsToVirtualRows } from '@/object-record/record-table/virtualization/hooks/useLoadRecordsToVirtualRows';
import { recordIdByRealIndexComponentState } from '@/object-record/record-table/virtualization/states/recordIdByRealIndexComponentState';
import { totalNumberOfRecordsToVirtualizeComponentState } from '@/object-record/record-table/virtualization/states/totalNumberOfRecordsToVirtualizeComponentState';
import { useAtomComponentSelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentSelectorValue';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useStore } from 'jotai';
import { useCallback, useMemo } from 'react';
import { FieldMetadataType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { IconPlus } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledGridContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const StyledGrid = styled.div`
  align-content: start;
  box-sizing: border-box;
  display: grid;
  flex: 1;
  gap: ${themeCssVariables.spacing[3]};
  grid-auto-rows: min-content;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledAddNewTile = styled.button`
  align-items: center;
  background: none;
  border: 1px dashed ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.md};
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.tertiary};
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: ${themeCssVariables.font.size.md};
  gap: ${themeCssVariables.spacing[2]};
  justify-content: center;
  min-height: 96px;

  &:hover {
    background: ${themeCssVariables.background.transparent.lighter};
  }
`;

const StyledFooter = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border-top: 1px solid ${themeCssVariables.border.color.light};
  bottom: 0;
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[6]};
  height: 36px;
  padding: 0 ${themeCssVariables.spacing[4]};
  position: sticky;
`;

const RecordTableCardGridAddNew = () => {
  const { objectMetadataItem } = useRecordTableContextOrThrow();

  const isRecordTableCellsNonEditable = useAtomComponentStateValue(
    isRecordTableCellsNonEditableComponentState,
  );

  const { createNewIndexRecord } = useCreateNewIndexRecord({
    objectMetadataItem,
  });

  const objectPermissions = useObjectPermissionsForObject(
    objectMetadataItem.id,
  );

  const hasAnySoftDeleteFilterOnView = useAtomComponentSelectorValue(
    hasAnySoftDeleteFilterOnViewComponentSelector,
  );

  const totalNumberOfRecordsToVirtualize = useAtomComponentStateValue(
    totalNumberOfRecordsToVirtualizeComponentState,
  );

  const { loadRecordsToVirtualRows } = useLoadRecordsToVirtualRows();
  const { upsertRecordsInStore } = useUpsertRecordsInStore();

  const handleClick = useCallback(async () => {
    const createdRecord = await createNewIndexRecord({ position: 'last' });

    upsertRecordsInStore({ partialRecords: [createdRecord] });

    if (isDefined(totalNumberOfRecordsToVirtualize)) {
      loadRecordsToVirtualRows({
        records: [createdRecord],
        startingRealIndex: totalNumberOfRecordsToVirtualize,
      });
    }
  }, [
    createNewIndexRecord,
    upsertRecordsInStore,
    loadRecordsToVirtualRows,
    totalNumberOfRecordsToVirtualize,
  ]);

  if (
    isRecordTableCellsNonEditable ||
    hasAnySoftDeleteFilterOnView ||
    !objectPermissions.canUpdateObjectRecords ||
    isRecordTableCreateDisabled(objectMetadataItem)
  ) {
    return null;
  }

  return (
    <StyledAddNewTile type="button" onClick={handleClick}>
      <IconPlus size={16} />
      {t`Add New`}
    </StyledAddNewTile>
  );
};

export const RecordTableCardGrid = () => {
  const store = useStore();

  const { visibleRecordFields } = useRecordTableContextOrThrow();
  const { labelIdentifierFieldMetadataItem, fieldDefinitionByFieldMetadataItemId } =
    useRecordIndexContextOrThrow();

  const recordIdByRealIndex = useAtomComponentStateValue(
    recordIdByRealIndexComponentState,
  );

  const totalNumberOfRecords =
    useAtomComponentStateValue(totalNumberOfRecordsToVirtualizeComponentState) ??
    0;

  const recordEntries = useMemo(
    () =>
      Array.from(recordIdByRealIndex.entries())
        .filter(([realIndex]) => realIndex < totalNumberOfRecords)
        .sort(([indexA], [indexB]) => indexA - indexB),
    [recordIdByRealIndex, totalNumberOfRecords],
  );

  const { cardFields, footerField } = useMemo(() => {
    const allFields = visibleRecordFields
      .filter(
        (recordField) =>
          recordField.fieldMetadataItemId !==
          labelIdentifierFieldMetadataItem?.id,
      )
      .map((recordField) => ({
        recordField,
        fieldDefinition:
          fieldDefinitionByFieldMetadataItemId[recordField.fieldMetadataItemId],
      }))
      .filter((field) => isDefined(field.fieldDefinition));

    // Domain is shown under the name and creator is omitted to keep cards compact
    const hiddenFieldNames = ['domainName', 'createdBy'];

    return {
      cardFields: allFields.filter(
        (field) =>
          field.fieldDefinition.metadata.fieldName !== 'createdAt' &&
          !hiddenFieldNames.includes(field.fieldDefinition.metadata.fieldName),
      ),
      footerField: allFields.find(
        (field) => field.fieldDefinition.metadata.fieldName === 'createdAt',
      ),
    };
  }, [
    visibleRecordFields,
    labelIdentifierFieldMetadataItem?.id,
    fieldDefinitionByFieldMetadataItemId,
  ]);

  const maxNumberAggregate = useMemo(() => {
    const numberField = cardFields.find(
      (field) => field.fieldDefinition.type === FieldMetadataType.NUMBER,
    );

    if (!isDefined(numberField)) {
      return undefined;
    }

    const values = recordEntries
      .map(([, recordId]) =>
        store.get(recordStoreFamilyState.atomFamily(recordId)),
      )
      .map((record) => record?.[numberField.fieldDefinition.metadata.fieldName])
      .filter((value): value is number => typeof value === 'number');

    return {
      label: numberField.fieldDefinition.label,
      value: values.length > 0 ? Math.max(...values) : undefined,
    };
  }, [cardFields, recordEntries, store]);

  return (
    <StyledGridContainer>
      <RecordTableVirtualizedDataChangedEffect />
      <StyledGrid>
        {recordEntries.map(([realIndex, recordId]) => (
          <RecordTableCardGridCard
            key={recordId}
            recordId={recordId}
            realIndex={realIndex}
            fields={cardFields}
            footerField={footerField}
          />
        ))}
        <RecordTableCardGridAddNew />
      </StyledGrid>
      <StyledFooter>
        <span>{t`Count all`} {totalNumberOfRecords}</span>
        {isDefined(maxNumberAggregate) && (
          <span>
            {t`Max of`} {maxNumberAggregate.label}{' '}
            {maxNumberAggregate.value?.toLocaleString() ?? '-'}
          </span>
        )}
      </StyledFooter>
    </StyledGridContainer>
  );
};
