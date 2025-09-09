// Save Menu validation helpers

import { monthNames } from './CalendarUtils';

export const formatDateISO = (date: Date) =>
  date.toISOString().split('T')[0];

export const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(date);
  d.setHours(0,0,0,0);
  return d < today;
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isHoliday = (date: Date, holidays: {date: string}[]) => {
  const dStr = formatDateISO(date);
  return holidays.some(h => h.date === dStr);
};

export const isFutureLimitExceeded = (date: Date) => {
  const limit = new Date();
  limit.setMonth(limit.getMonth() + 3);
  return date > limit;
};

// -------------------- Main Validation --------------------

export const validateMenuDate = (
  date: Date,
  holidays: {date: string}[]
): string | null => {
  if (isPastDate(date)) return 'You cannot save meals for past dates.';
  if (isFutureLimitExceeded(date)) return 'You can only schedule meals within the next 3 months.';
  if (isWeekend(date)) return 'Weekends are not allowed for meal plans.';
  if (isHoliday(date, holidays)) return 'This date is marked as a holiday.';
  return null; 
};
