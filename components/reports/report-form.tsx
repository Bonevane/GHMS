"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { LabReportForm } from './forms/lab-report-form';
import { RadiologyReportForm } from './forms/radiology-report-form';

interface ReportFormProps {
  type: 'lab' | 'radiology';
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ReportForm({ type, onSubmit, onCancel }: ReportFormProps) {
  return (
    <ScrollArea className="h-[500px] pr-4">
      {type === 'lab' && (
        <LabReportForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {type === 'radiology' && (
        <RadiologyReportForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </ScrollArea>
  );
}