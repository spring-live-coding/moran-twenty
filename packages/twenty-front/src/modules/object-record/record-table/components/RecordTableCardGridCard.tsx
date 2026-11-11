import { useRecordChipData } from '@/object-record/hooks/useRecordChipData';
import { type RecordField } from '@/object-record/record-field/types/RecordField';
import { FieldDisplay } from '@/object-record/record-field/ui/components/FieldDisplay';
import { FieldContext } from '@/object-record/record-field/ui/contexts/FieldContext';
import { RecordFieldComponentInstanceContext } from '@/object-record/record-field/ui/states/contexts/RecordFieldComponentInstanceContext';
import { type FieldDefinition } from '@/object-record/record-field/ui/types/FieldDefinition';
import { type FieldMetadata } from '@/object-record/record-field/ui/types/FieldMetadata';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { RECORD_TABLE_CELL_INPUT_ID_PREFIX } from '@/object-record/record-table/constants/RecordTableCellInputIdPrefix';
import { useRecordTableContextOrThrow } from '@/object-record/record-table/contexts/RecordTableContext';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { getRecordFieldInputInstanceId } from '@/object-record/utils/getRecordFieldInputId';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';
import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';
import { Avatar, IconCalendarEvent, useIcons } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

export type RecordTableCardGridField = {
  recordField: RecordField;
  fieldDefinition: FieldDefinition<FieldMetadata>;
};

const StyledCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  box-shadow: ${themeCssVariables.boxShadow.light};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  min-width: 0;
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledTitleButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  gap: ${themeCssVariables.spacing[3]};
  min-width: 0;
  padding: 0;
  text-align: left;
`;

const StyledTitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledName = styled.span`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledSubtitle = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledFields = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding-top: ${themeCssVariables.spacing[2]};
`;

const StyledFieldRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  min-height: 24px;
`;

const StyledFieldLabel = styled.span`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[1]};
  white-space: nowrap;
  width: 112px;
`;

const StyledFieldValue = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

const StyledFooter = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[1]};
`;

type RecordTableCardGridCardProps = {
  recordId: string;
  realIndex: number;
  fields: RecordTableCardGridField[];
  footerField?: RecordTableCardGridField;
};

const getDomainLabel = (domainName: unknown): string | undefined => {
  if (!isDefined(domainName) || typeof domainName !== 'object') {
    return undefined;
  }

  const primaryLinkUrl = (domainName as { primaryLinkUrl?: unknown })
    .primaryLinkUrl;

  if (!isNonEmptyString(primaryLinkUrl)) {
    return undefined;
  }

  return primaryLinkUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};

const RecordTableCardGridFieldValue = ({
  recordId,
  field,
}: {
  recordId: string;
  field: RecordTableCardGridField;
}) => {
  const { fieldDefinition } = field;

  return (
    <FieldContext.Provider
      value={{
        recordId,
        maxWidth: 150,
        isLabelIdentifier: false,
        isRecordFieldReadOnly: true,
        fieldDefinition,
        isDisplayModeFixHeight: true,
        disableChipClick: false,
      }}
    >
      <RecordFieldComponentInstanceContext.Provider
        value={{
          instanceId: getRecordFieldInputInstanceId({
            recordId,
            fieldName: fieldDefinition.metadata.fieldName,
            prefix: `${RECORD_TABLE_CELL_INPUT_ID_PREFIX}-card`,
          }),
        }}
      >
        <FieldDisplay />
      </RecordFieldComponentInstanceContext.Provider>
    </FieldContext.Provider>
  );
};

export const RecordTableCardGridCard = ({
  recordId,
  realIndex,
  fields,
  footerField,
}: RecordTableCardGridCardProps) => {
  const { objectNameSingular, onRecordIdentifierClick } =
    useRecordTableContextOrThrow();

  const { getIcon } = useIcons();

  const record = useAtomFamilyStateValue(recordStoreFamilyState, recordId);

  if (!isDefined(record)) {
    return null;
  }

  return (
    <RecordTableCardGridCardContent
      recordId={recordId}
      realIndex={realIndex}
      fields={fields}
      footerField={footerField}
      objectNameSingular={objectNameSingular}
      onRecordIdentifierClick={onRecordIdentifierClick}
      getIcon={getIcon}
      record={record}
    />
  );
};

type RecordTableCardGridCardContentProps = RecordTableCardGridCardProps & {
  objectNameSingular: string;
  onRecordIdentifierClick?: (rowIndex: number, recordId: string) => void;
  getIcon: ReturnType<typeof useIcons>['getIcon'];
  record: ObjectRecord;
};

const RecordTableCardGridCardContent = ({
  recordId,
  realIndex,
  fields,
  footerField,
  objectNameSingular,
  onRecordIdentifierClick,
  getIcon,
  record,
}: RecordTableCardGridCardContentProps) => {
  const { recordChipData } = useRecordChipData({
    objectNameSingular,
    record,
  });

  const domainLabel = getDomainLabel(record.domainName);

  return (
    <StyledCard>
      <StyledHeader>
        <StyledTitleButton
          type="button"
          onClick={() => onRecordIdentifierClick?.(realIndex, recordId)}
        >
          <Avatar
            size="xl"
            type={recordChipData.avatarType}
            avatarUrl={recordChipData.avatarUrl}
            placeholder={recordChipData.name}
            placeholderColorSeed={recordId}
          />
          <StyledTitleText>
            <StyledName>{recordChipData.name}</StyledName>
            {isDefined(domainLabel) && (
              <StyledSubtitle>{domainLabel}</StyledSubtitle>
            )}
          </StyledTitleText>
        </StyledTitleButton>
      </StyledHeader>
      {fields.length > 0 && (
        <StyledFields>
          {fields.map((field) => {
            const FieldIcon = getIcon(field.fieldDefinition.iconName);

            return (
              <StyledFieldRow key={field.recordField.fieldMetadataItemId}>
                <StyledFieldLabel>
                  <FieldIcon size={14} />
                  {field.fieldDefinition.label}
                </StyledFieldLabel>
                <StyledFieldValue>
                  <RecordTableCardGridFieldValue
                    recordId={recordId}
                    field={field}
                  />
                </StyledFieldValue>
              </StyledFieldRow>
            );
          })}
        </StyledFields>
      )}
      {isDefined(footerField) && (
        <StyledFooter>
          <IconCalendarEvent size={14} />
          <RecordTableCardGridFieldValue
            recordId={recordId}
            field={footerField}
          />
        </StyledFooter>
      )}
    </StyledCard>
  );
};
