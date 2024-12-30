"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReportForm } from '@/components/reports/report-form';
import { ReportList } from '@/components/reports/report-list';
import { useReports } from '@/hooks/use_reports';
import { format } from 'date-fns';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filterByDate, generateMonthOptions, generateYearOptions } from '@/lib/utils/report-filters';


type ReportType = 'lab' | 'radiology';

export default function ReportsPage() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const {
    selectedType,
    setSelectedType,
    reports,
    isDialogOpen,
    setIsDialogOpen,
    handleAddReport,
    handleDeleteReport,
  } = useReports();

  const reportTypes = [
    { id: 'lab', label: 'Laboratory Reports' },
    { id: 'radiology', label: 'Radiology Reports' },
  ];

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

  const filteredByTypeReports = reports.filter(report => report.type === selectedType);
  const filteredReports = filterByDate(filteredByTypeReports, selectedYear, selectedMonth);
  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();

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

      <div className="flex gap-4">
        <div className="w-[150px]">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[150px]">
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                    <TableCell>{report.referredby}</TableCell>
                    <TableCell>{report.testname}</TableCell>
                    <TableCell>{report.labname}</TableCell>
                    <TableCell>{report.criticalresult ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{report.informto}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{format(new Date(report.date!), 'PPP')}</TableCell>
                    <TableCell>{report.mr}</TableCell>
                    <TableCell>{report.referredby}</TableCell>
                    <TableCell>{report.radiologytestname}</TableCell>
                    <TableCell>{report.labname}</TableCell>
                    <TableCell>{format(new Date(report.timein!.toString()), 'HH:mm')}</TableCell>
                    <TableCell>{format(new Date(String(report.timeout)), 'HH:mm')}</TableCell>
                  </>
                )}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => report.id && handleDeleteReport(report.id)}
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