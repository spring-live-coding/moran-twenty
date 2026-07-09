import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { createPortal } from 'react-dom';

import { useDeleteManyRecords } from '@/object-record/hooks/useDeleteManyRecords';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useResetRecordIndexSelection } from '@/object-record/record-index/hooks/useResetRecordIndexSelection';
import { selectedRowIdsComponentSelector } from '@/object-record/record-table/states/selectors/selectedRowIdsComponentSelector';
import { RootStackingContextZIndices } from '@/ui/layout/constants/RootStackingContextZIndices';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useModal } from '@/ui/layout/modal/hooks/useModal';
import { OverlayContainer } from '@/ui/layout/overlay/components/OverlayContainer';
import { useAtomComponentSelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentSelectorValue';
import { Chip, ChipSize, ChipVariant } from 'twenty-ui/components';
import { IconTrash, IconX } from 'twenty-ui/display';
import { FloatingButton, FloatingIconButton } from 'twenty-ui/input';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledBarPositioner = styled.div`
  bottom: ${themeCssVariables.spacing[6]};
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  z-index: ${RootStackingContextZIndices.BulkActionBar};
`;

const StyledCard = styled(OverlayContainer)`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[2]}
    ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledDivider = styled.div`
  align-self: stretch;
  border-left: 1px solid ${themeCssVariables.border.color.medium};
`;

const getDeleteSelectedRecordsModalId = (recordIndexId: string) =>
  `delete-selected-records-${recordIndexId}`;

export const RecordIndexBulkActionBar = () => {
  const { recordIndexId, objectNameSingular, objectMetadataItem } =
    useRecordIndexContextOrThrow();

  const selectedRowIds = useAtomComponentSelectorValue(
    selectedRowIdsComponentSelector,
    recordIndexId,
  );

  const { resetRecordIndexSelection } = useResetRecordIndexSelection();
  const { deleteManyRecords } = useDeleteManyRecords({ objectNameSingular });
  const { openModal } = useModal();

  if (selectedRowIds.length === 0) {
    return null;
  }

  const modalId = getDeleteSelectedRecordsModalId(recordIndexId);

  const handleConfirmDelete = async () => {
    await deleteManyRecords({ recordIdsToDelete: selectedRowIds });
    resetRecordIndexSelection();
  };

  return createPortal(
    <>
      <StyledBarPositioner>
        <StyledCard>
          <Chip
            label={t`${selectedRowIds.length} selected`}
            variant={ChipVariant.Highlighted}
            size={ChipSize.Large}
            clickable={false}
          />
          <StyledDivider />
          <FloatingButton
            Icon={IconTrash}
            title={t`Delete`}
            applyBlur={false}
            applyShadow={false}
            onClick={() => openModal(modalId)}
          />
          <FloatingIconButton
            Icon={IconX}
            position="standalone"
            applyBlur={false}
            applyShadow={false}
            onClick={resetRecordIndexSelection}
          />
        </StyledCard>
      </StyledBarPositioner>
      <ConfirmationModal
        modalInstanceId={modalId}
        title={t`Delete ${objectMetadataItem.labelPlural}`}
        subtitle={
          <Trans>
            Are you sure you want to delete {selectedRowIds.length} selected{' '}
            {objectMetadataItem.labelPlural}? This action cannot be undone.
          </Trans>
        }
        onConfirmClick={handleConfirmDelete}
        confirmButtonText={t`Delete`}
      />
    </>,
    document.body,
  );
};
