"use client"

import { startOfMonth, endOfMonth } from 'date-fns';


// Define interface for any object with a date field
interface HasDate {
  [key: string]: any;
  date?: Date | string;
}

export function filterByDate<T extends HasDate>(
  items: T[],
  selectedYear: number,
  selectedMonth: number,
  dateField: keyof T = 'date'
): T[] {
  return items.filter(item => {
    const itemDate = new Date(item[dateField] as string | Date);
    const monthStart = startOfMonth(new Date(selectedYear, selectedMonth - 1));
    const monthEnd = endOfMonth(new Date(selectedYear, selectedMonth - 1));
    
    return itemDate >= monthStart && itemDate <= monthEnd;
  });
}

export function generateYearOptions(): { value: number; label: string; }[] {
  const currentYear = new Date().getFullYear();
  const years: { value: number; label: string; }[] = [];

  for (let year = currentYear; year >= currentYear - 10; year--) {
    years.push({
      value: year,
      label: year.toString()
    });
  }

  return years;
}

export function generateMonthOptions(): { value: number; label: string; }[] {
  return [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
}