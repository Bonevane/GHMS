"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { LabReport, RadiologyReport } from '@/app/types/reports';
import { ReportForm } from '@/components/reports/report-form';

type ReportType = 'lab' | 'radiology';

interface Report extends Partial<LabReport>, Partial<RadiologyReport> {
  id: string;
  type: ReportType;
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType>('lab');
  const [reports, setReports] = useState<Report[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reportTypes = [
    { id: 'lab', label: 'Laboratory Reports' },
    { id: 'radiology', label: 'Radiology Reports' },
  ];

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

  const getColumns = () => {
    switch (selectedType) {
      case 'lab':
        return ['MR#', 'Date', 'Referred By', 'Test Name', 'Lab Name', 'Critical Result', 'Inform To'];
      case 'radiology':
        return ['Date', 'MR', 'Referred By', 'Radiology Test Name', 'Lab Name', 'Time In', 'Time Out'];
      default:
        return [];
    }
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
        {reportTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedType === type.id as ReportType ? "default" : "outline"}
            onClick={() => setSelectedType(type.id as ReportType)}
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {reportTypes.find(t => t.id === selectedType)?.label}
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
              <DialogTitle>Add New {reportTypes.find(t => t.id === selectedType)?.label}</DialogTitle>
            </DialogHeader>
            <ReportForm
              type={selectedType}
              onSubmit={handleAddReport}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {getColumns().map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                {selectedType === 'lab' ? (
                  <>
                    <TableCell>{report.mr}</TableCell>
                    <TableCell>{format(new Date(report.date!), 'PPP')}</TableCell>
                    <TableCell>{report.referredBy}</TableCell>
                    <TableCell>{report.testName}</TableCell>
                    <TableCell>{report.labName}</TableCell>
                    <TableCell>{report.criticalResult ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{report.informTo}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{format(new Date(report.date!), 'PPP')}</TableCell>
                    <TableCell>{report.mr}</TableCell>
                    <TableCell>{report.referredBy}</TableCell>
                    <TableCell>{report.radiologyTestName}</TableCell>
                    <TableCell>{report.labName}</TableCell>
                    <TableCell>{format(new Date(report.timeIn!), 'HH:mm')}</TableCell>
                    <TableCell>{format(new Date(report.timeOut!), 'HH:mm')}</TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={getColumns().length + 1} className="text-center">
                  No reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}