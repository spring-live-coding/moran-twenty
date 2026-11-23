import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { CalendarStartDay } from 'twenty-shared/constants';
import { Tag } from 'twenty-ui/components';
import { Card, CardContent, CardHeader } from 'twenty-ui/layout';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { DateFormat } from '@/localization/constants/DateFormat';
import { NumberFormat } from '@/localization/constants/NumberFormat';
import { TimeFormat } from '@/localization/constants/TimeFormat';
import { useFormatPreferences } from '@/localization/hooks/useFormatPreferences';
import { detectCalendarStartDay } from '@/localization/utils/detection/detectCalendarStartDay';
import { detectDateFormat } from '@/localization/utils/detection/detectDateFormat';
import { detectTimeFormat } from '@/localization/utils/detection/detectTimeFormat';
import { detectTimeZone } from '@/localization/utils/detection/detectTimeZone';
import { formatTimeZoneLabel } from '@/localization/utils/formatTimeZoneLabel';
import { formatNumber } from '~/utils/format/formatNumber';

const NUMBER_PREVIEW_VALUE = 1234.56;
const DAYS_IN_WEEK = 7;
// 2023-01-01 is a Sunday, so day-of-week N maps to January (1 + N)
const REFERENCE_SUNDAY_DAY_OF_MONTH = 1;

const StyledPreview = styled.div`
  align-self: start;
  position: sticky;
  top: ${themeCssVariables.spacing[8]};
`;

const StyledHeaderRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledLabel = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.xs};
`;

const StyledValue = styled.div`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.medium};
  margin-top: ${themeCssVariables.spacing[1]};
`;

const StyledSubValue = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  margin-top: ${themeCssVariables.spacing[1]};
`;

const StyledCalendar = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  display: grid;
  font-size: ${themeCssVariables.font.size.xs};
  gap: ${themeCssVariables.spacing[1]};
  grid-template-columns: repeat(7, 1fr);
  margin-top: ${themeCssVariables.spacing[2]};
  text-align: center;
`;

const StyledWeekday = styled.div`
  color: ${themeCssVariables.font.color.light};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

const StyledDay = styled.div<{ isToday?: boolean }>`
  align-items: center;
  background: ${({ isToday }) =>
    isToday ? themeCssVariables.accent.accent9 : 'transparent'};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ isToday }) =>
    isToday ? themeCssVariables.font.color.inverted : 'inherit'};
  display: flex;
  font-weight: ${({ isToday }) =>
    isToday
      ? themeCssVariables.font.weight.medium
      : themeCssVariables.font.weight.regular};
  height: ${themeCssVariables.spacing[6]};
  justify-content: center;
`;

export const FormatPreview = () => {
  const { t } = useLingui();
  const { formatPreferences } = useFormatPreferences();

  const timeZone =
    formatPreferences.timeZone === 'system'
      ? detectTimeZone()
      : formatPreferences.timeZone;

  const dateFormat =
    formatPreferences.dateFormat === DateFormat.SYSTEM
      ? DateFormat[detectDateFormat()]
      : formatPreferences.dateFormat;

  const timeFormat =
    formatPreferences.timeFormat === TimeFormat.SYSTEM
      ? TimeFormat[detectTimeFormat()]
      : formatPreferences.timeFormat;

  const numberFormat =
    formatPreferences.numberFormat === NumberFormat.SYSTEM
      ? NumberFormat.COMMAS_AND_DOT
      : formatPreferences.numberFormat;

  const calendarStartDay =
    formatPreferences.calendarStartDay === CalendarStartDay.SYSTEM
      ? CalendarStartDay[detectCalendarStartDay()]
      : formatPreferences.calendarStartDay;

  const now = new Date();

  const [year, month, today] = formatInTimeZone(now, timeZone, 'yyyy-M-d')
    .split('-')
    .map(Number);

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingEmptyDays =
    (firstDayOfMonth.getDay() - calendarStartDay + DAYS_IN_WEEK) %
    DAYS_IN_WEEK;

  const getDayOfWeekDate = (dayOfWeek: number) =>
    new Date(2023, 0, REFERENCE_SUNDAY_DAY_OF_MONTH + dayOfWeek);

  const weekdayLabels = Array.from({ length: DAYS_IN_WEEK }, (_, index) =>
    format(getDayOfWeekDate((calendarStartDay + index) % DAYS_IN_WEEK), 'EEEEE'),
  );

  const timeZoneLabel = formatTimeZoneLabel(timeZone).replace(
    /^\([^)]*\)\s*/,
    '',
  );

  const monthLabel = format(firstDayOfMonth, 'LLLL yyyy');
  const startDayLabel = format(getDayOfWeekDate(calendarStartDay), 'EEEE');

  return (
    <StyledPreview>
      <Card rounded backgroundColor={themeCssVariables.background.secondary}>
        <CardHeader>
          <StyledHeaderRow>
            {t`Preview`}
            <Tag color="blue" text={t`Live`} weight="medium" preventShrink />
          </StyledHeaderRow>
        </CardHeader>
        <CardContent divider>
          <StyledLabel>{t`Date`}</StyledLabel>
          <StyledValue>{formatInTimeZone(now, timeZone, dateFormat)}</StyledValue>
        </CardContent>
        <CardContent divider>
          <StyledLabel>{t`Time`}</StyledLabel>
          <StyledValue>{formatInTimeZone(now, timeZone, timeFormat)}</StyledValue>
          <StyledSubValue>{timeZoneLabel}</StyledSubValue>
        </CardContent>
        <CardContent divider>
          <StyledLabel>{t`Number`}</StyledLabel>
          <StyledValue>
            {formatNumber(NUMBER_PREVIEW_VALUE, {
              format: numberFormat,
              decimals: 2,
            })}
          </StyledValue>
        </CardContent>
        <CardContent>
          <StyledLabel>
            {t`${monthLabel} · weeks start on ${startDayLabel}`}
          </StyledLabel>
          <StyledCalendar>
            {weekdayLabels.map((label, index) => (
              <StyledWeekday key={index}>{label}</StyledWeekday>
            ))}
            {Array.from({ length: leadingEmptyDays }, (_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => (
              <StyledDay key={index} isToday={index + 1 === today}>
                {index + 1}
              </StyledDay>
            ))}
          </StyledCalendar>
        </CardContent>
      </Card>
    </StyledPreview>
  );
};
