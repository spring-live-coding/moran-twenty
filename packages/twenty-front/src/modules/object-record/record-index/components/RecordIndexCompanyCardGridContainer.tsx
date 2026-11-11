import { styled } from '@linaria/react';
import { plural, t } from '@lingui/core/macro';
import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useObjectPermissionsForObject } from '@/object-record/hooks/useObjectPermissionsForObject';
import { RecordIndexCompanyCard } from '@/object-record/record-index/components/RecordIndexCompanyCard';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useRecordIndexTableQuery } from '@/object-record/record-index/hooks/useRecordIndexTableQuery';
import { useCreateNewIndexRecord } from '@/object-record/record-table/hooks/useCreateNewIndexRecord';
import { isRecordTableCreateDisabled } from '@/object-record/record-table/utils/isRecordTableCreateDisabled';
import { IconPlus } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

const StyledContainer = styled.div`
  background-color: ${themeCssVariables.background.secondary};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  min-height: 0;
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[4]};
  width: 100%;
`;

const StyledCount = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.md};
`;

const StyledGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

const StyledAddNewCard = styled.button`
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
  min-height: 120px;

  &:hover {
    background-color: ${themeCssVariables.background.transparent.lighter};
  }
`;

const StyledFetchMoreTrigger = styled.div`
  height: 1px;
`;

export const RecordIndexCompanyCardGridContainer = () => {
  const { theme } = useContext(ThemeContext);

  const { objectNameSingular, objectMetadataItem, recordIndexId } =
    useRecordIndexContextOrThrow();

  const { records, totalCount, hasNextPage, loading, fetchMoreRecords } =
    useRecordIndexTableQuery(objectNameSingular);

  const { createNewIndexRecord } = useCreateNewIndexRecord({
    objectMetadataItem,
    instanceId: recordIndexId,
  });

  const objectPermissions = useObjectPermissionsForObject(
    objectMetadataItem.id,
  );

  const canCreateRecord =
    objectPermissions.canUpdateObjectRecords &&
    !isRecordTableCreateDisabled(objectMetadataItem);

  const { ref: fetchMoreTriggerRef, inView: isFetchMoreTriggerInView } =
    useInView();

  useEffect(() => {
    if (isFetchMoreTriggerInView && hasNextPage && !loading) {
      fetchMoreRecords();
    }
  }, [isFetchMoreTriggerInView, hasNextPage, loading, fetchMoreRecords]);

  const numberOfCompanies = totalCount ?? records.length;

  return (
    <StyledContainer>
      <StyledCount>
        {plural(numberOfCompanies, {
          one: '# company',
          other: '# companies',
        })}
      </StyledCount>
      <StyledGrid>
        {records.map((record) => (
          <RecordIndexCompanyCard key={record.id} record={record} />
        ))}
        {canCreateRecord && (
          <StyledAddNewCard
            type="button"
            onClick={() => createNewIndexRecord({ position: 'last' })}
          >
            <IconPlus size={theme.icon.size.md} stroke={theme.icon.stroke.md} />
            {t`Add New`}
          </StyledAddNewCard>
        )}
      </StyledGrid>
      <StyledFetchMoreTrigger ref={fetchMoreTriggerRef} />
    </StyledContainer>
  );
};
