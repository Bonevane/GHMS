"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReportForm } from '@/components/reports/report-form';
import { ReportList } from '@/components/reports/report-list';

export default function ReportTypePage() {
  const params = useParams();
  const reportType = params.type as 'radiology' | 'laboratory';
  const [reports, setReports] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReport = (data: any) => {
    const newReport = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      type: reportType,
      createdAt: new Date(),
    };
    setReports(prev => [...prev, newReport]);
    setIsDialogOpen(false);
  };

  const handleUpdateReport = (id: string, data: any) => {
    setReports(prev =>
      prev.map(report => report.id === id ? { ...report, ...data } : report)
    );
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Reports
          </h2>
          <p className="text-muted-foreground">
            Manage and view {reportType.toLowerCase()} reports
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</DialogTitle>
            </DialogHeader>
            <ReportForm
              type={reportType}
              onSubmit={handleAddReport}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ReportList
        reports={reports}
        onUpdate={handleUpdateReport}
        onDelete={handleDeleteReport}
      />
    </div>
  );
}