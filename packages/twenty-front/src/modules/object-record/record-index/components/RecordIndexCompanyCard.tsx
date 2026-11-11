import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getLinkToShowPage } from '@/object-metadata/utils/getLinkToShowPage';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { beautifyPastDateRelativeToNow } from '~/utils/date-utils';
import { formatNumber } from '~/utils/format/formatNumber';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';
import {
  Avatar,
  IconBrandLinkedin,
  IconMap,
  IconUserCircle,
  IconUsers,
  type IconComponent,
} from 'twenty-ui/display';
import { LinkType } from 'twenty-ui/navigation';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { getDisplayValueByUrlType } from 'twenty-ui/utilities';

const LOGO_TILE_COLORS = [
  'blue',
  'cyan',
  'gray',
  'orange',
  'red',
  'green',
  'pink',
  'violet',
  'sky',
  'yellow',
] as const;

type LogoTileColor = (typeof LOGO_TILE_COLORS)[number];

const getLogoTileColor = (seed: string): LogoTileColor => {
  const hash = Array.from(seed).reduce(
    (accumulator, character) => accumulator + character.charCodeAt(0),
    0,
  );

  return LOGO_TILE_COLORS[hash % LOGO_TILE_COLORS.length];
};

const StyledCard = styled(Link)`
  background-color: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  box-shadow: ${themeCssVariables.boxShadow.light};
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  min-width: 0;
  padding: ${themeCssVariables.spacing[4]};
  text-decoration: none;

  &:hover {
    background-color: ${themeCssVariables.background.secondary};
  }
`;

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  min-width: 0;
`;

const StyledLogoTile = styled.div<{ tileColor: LogoTileColor }>`
  align-items: center;
  background-color: ${({ tileColor }) =>
    themeCssVariables.tag.background[tileColor]};
  border: 1px solid ${themeCssVariables.border.color.transparentStrong};
  border-radius: ${themeCssVariables.border.radius.sm};
  box-sizing: border-box;
  color: ${({ tileColor }) => themeCssVariables.tag.text[tileColor]};
  display: flex;
  flex-shrink: 0;
  font-weight: ${themeCssVariables.font.weight.semiBold};
  height: ${themeCssVariables.spacing[8]};
  justify-content: center;
  width: ${themeCssVariables.spacing[8]};
`;

const StyledTitleContainer = styled.div`
  min-width: 0;
`;

const StyledName = styled.div`
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledSecondaryText = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledDivider = styled.div`
  background-color: ${themeCssVariables.border.color.light};
  height: 1px;
`;

const StyledFieldRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  min-width: 0;
`;

const StyledFieldLabel = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledFieldValue = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  min-width: 0;
`;

const StyledOwnerName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledPill = styled.span`
  align-items: center;
  background-color: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.pill};
  box-sizing: border-box;
  display: inline-flex;
  height: ${themeCssVariables.spacing[5]};
  max-width: 100%;
  overflow: hidden;
  padding: 0 ${themeCssVariables.spacing[2]};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type RecordIndexCompanyCardFieldProps = {
  Icon: IconComponent;
  label: string;
  children: React.ReactNode;
};

const RecordIndexCompanyCardField = ({
  Icon,
  label,
  children,
}: RecordIndexCompanyCardFieldProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledFieldRow>
      <StyledFieldLabel>
        <Icon
          size={theme.icon.size.sm}
          stroke={theme.icon.stroke.md}
          color={theme.font.color.tertiary}
        />
        {label}
      </StyledFieldLabel>
      <StyledFieldValue>{children}</StyledFieldValue>
    </StyledFieldRow>
  );
};

type RecordIndexCompanyCardProps = {
  record: ObjectRecord;
};

export const RecordIndexCompanyCard = ({
  record,
}: RecordIndexCompanyCardProps) => {
  const companyName: string = record.name ?? '';

  const domain: string = (record.domainName?.primaryLinkUrl ?? '').replace(
    /^(https?:\/\/)?(www\.)?/,
    '',
  );

  const ownerFirstName: string = record.accountOwner?.name?.firstName ?? '';
  const ownerFullName = [ownerFirstName, record.accountOwner?.name?.lastName]
    .filter(isNonEmptyString)
    .join(' ');

  const linkedinHref: string = record.linkedinLink?.primaryLinkUrl ?? '';
  const linkedinHandle = isNonEmptyString(linkedinHref)
    ? getDisplayValueByUrlType({ type: LinkType.LinkedIn, href: linkedinHref })
    : undefined;

  const city: string = record.address?.addressCity ?? '';

  const createdAtLabel = isNonEmptyString(record.createdAt)
    ? beautifyPastDateRelativeToNow(record.createdAt)
    : '';
  const createdByName: string = record.createdBy?.name ?? '';

  return (
    <StyledCard to={getLinkToShowPage('company', record)}>
      <StyledHeader>
        <StyledLogoTile tileColor={getLogoTileColor(record.id)}>
          {companyName.trim().charAt(0).toUpperCase()}
        </StyledLogoTile>
        <StyledTitleContainer>
          <StyledName>{companyName}</StyledName>
          {isNonEmptyString(domain) && (
            <StyledSecondaryText>{domain}</StyledSecondaryText>
          )}
        </StyledTitleContainer>
      </StyledHeader>
      <StyledDivider />
      {isNonEmptyString(ownerFullName) && (
        <RecordIndexCompanyCardField
          Icon={IconUserCircle}
          label={t`Account owner`}
        >
          <Avatar
            type="rounded"
            size="md"
            placeholder={ownerFirstName}
            placeholderColorSeed={record.accountOwner?.id}
          />
          <StyledOwnerName>{ownerFullName}</StyledOwnerName>
        </RecordIndexCompanyCardField>
      )}
      {isDefined(record.employees) && (
        <RecordIndexCompanyCardField Icon={IconUsers} label={t`Employees`}>
          {formatNumber(record.employees)}
        </RecordIndexCompanyCardField>
      )}
      {isNonEmptyString(city) && (
        <RecordIndexCompanyCardField Icon={IconMap} label={t`Address`}>
          {city}
        </RecordIndexCompanyCardField>
      )}
      {isDefined(linkedinHandle) && (
        <RecordIndexCompanyCardField
          Icon={IconBrandLinkedin}
          label={t`Linkedin`}
        >
          <StyledPill>{linkedinHandle}</StyledPill>
        </RecordIndexCompanyCardField>
      )}
      {isNonEmptyString(createdAtLabel) && (
        <StyledSecondaryText>
          {isNonEmptyString(createdByName)
            ? t`Created ${createdAtLabel} by ${createdByName}`
            : t`Created ${createdAtLabel}`}
        </StyledSecondaryText>
      )}
    </StyledCard>
  );
};
