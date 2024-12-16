"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReportList } from '@/components/reports/report-list';
import { ReportForm } from '@/components/reports/report-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { reportTypes } from '@/lib/utils/report-types';

type ReportType = keyof typeof reportTypes;

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType>('radiology');
  const [reports, setReports] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReport = (data: any) => {
    const newReport = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
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

  const filteredReports = reports.filter(report => report.type === selectedType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medical Reports</h2>
        <p className="text-muted-foreground">
          View and manage medical reports
        </p>
      </div>

      <div className="flex gap-2">
        {Object.entries(reportTypes).map(([type, { title }]) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(type as ReportType)}
          >
            {title}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {reportTypes[selectedType].title}
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {reportTypes[selectedType].title}</DialogTitle>
            </DialogHeader>
            <ReportForm
              type={selectedType}
              onSubmit={handleAddReport}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ReportList
        reports={filteredReports}
        onUpdate={handleUpdateReport}
        onDelete={handleDeleteReport}
      />
    </div>
  );
}