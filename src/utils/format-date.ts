/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

export function formatDate(
  date?: Date,
  format: string = 'DD MMM, YYYY'
): string {
  if (!date) return '';
  return dayjs(date).format(format);
}

export function formatDateTime(dateString:any) {
  const date = new Date(dateString);

  const options:any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  // Convert to the desired format
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}

