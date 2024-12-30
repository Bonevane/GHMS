"use client"

import { Surgery } from '@/app/types';
import { startOfMonth, endOfMonth } from 'date-fns';

export function filterSurgeries(
  surgeries: Surgery[],
  selectedYear: number,
  selectedMonth: number,
  selectedStatus: string
): Surgery[] {
  return surgeries.filter(surgery => {
    const surgeryDate = new Date(surgery.doo);
    const monthStart = startOfMonth(new Date(selectedYear, selectedMonth - 1));
    const monthEnd = endOfMonth(new Date(selectedYear, selectedMonth - 1));
    
    const isInSelectedMonth = surgeryDate >= monthStart && surgeryDate <= monthEnd;
    const matchesStatus = selectedStatus === 'all' || surgery.status === selectedStatus;
    
    return isInSelectedMonth && matchesStatus;
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