"use client"

// filepath: /d:/DBS_project/GHMS/app/dashboard/records/page.tsx

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
import { RecordForm } from '@/components/records/record-form';
import { useRecords } from '@/hooks/use-records';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filterByDate, generateMonthOptions, generateYearOptions } from '@/lib/utils/report-filters';

type RecordType = 'adverseAnesthesiaEvent' | 'sterilizationRegister' | 'sentinelEvent' | 'bloodTransfusionReaction' | 'surgicalSiteInfection' | 'verbalOrder' | 'otRecall' | 'redoRegister';

export default function RecordsPage() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const {
    selectedType,
    setSelectedType,
    records,
    isDialogOpen,
    setIsDialogOpen,
    handleAddRecord,
    handleDeleteRecord,
  } = useRecords();

  const recordTypes = [
    { id: 'adverseAnesthesiaEvent', label: 'Adverse Anesthesia Events' },
    { id: 'sterilizationRegister', label: 'Sterilization Registers' },
    { id: 'sentinelEvent', label: 'Sentinel Events' },
    { id: 'bloodTransfusionReaction', label: 'Blood Transfusion Reactions' },
    { id: 'surgicalSiteInfection', label: 'Surgical Site Infections' },
    { id: 'verbalOrder', label: 'Verbal Orders' },
    { id: 'otRecall', label: 'OT Recalls' },
    { id: 'redoRegister', label: 'Redo Registers' },
  ];

  const getColumns = () => {
    switch (selectedType) {
      case 'adverseAnesthesiaEvent':
        return ['Date', 'MR', 'Type of Anesthesia', 'Detail of Event', 'Analysis', 'Corrective Action'];
      case 'sterilizationRegister':
        return ['Batch', 'Date', 'Expiry Date', 'Pack', 'Issue Date', 'MR', 'Procedure', 'Surgeon', 'Stereotape Gauge Color Change'];
      case 'sentinelEvent':
        return [ 'Date', 'Event Summary', 'Person Factor', 'Action Token', 'Preventive Measure', 'Remarks'];
      case 'bloodTransfusionReaction':
        return ['Date', 'MR', 'Diagnosis', 'Blood Group Donor', 'Blood Group On Verify Recipient', 'Blood Group On Verify Donor', 'Transfusion Reaction Type', 'Possible Reaction', 'Remarks'];
      case 'surgicalSiteInfection':
        return ['Date', 'MR', 'Doctor Name', 'Procedure', 'OT', 'Remarks'];
      case 'verbalOrder':
        return ['Date', 'MR', 'Doctor Name', 'Medicine Order Verbally', 'Staff Name'];
      case 'otRecall':
        return ['Date', 'Batch', 'Items', 'Where To', 'Expiry Date', 'Sterilization Validation Tests', 'Person Responsible', 'Recall Notes'];
      case 'redoRegister':
        return ['Date', 'MR', 'Errors In Result', 'Test Redo', 'Report Not Correlating', 'Precautions Not Followed', 'Remarks'];
      default:
        return [];
    }
  };

  const filteredByTypeRecords = records.filter(record => record.type === selectedType);
  const filteredRecords = filterByDate(filteredByTypeRecords, selectedYear, selectedMonth);
  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
        <p className="text-muted-foreground">
          View and manage medical records
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {recordTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            onClick={() => setSelectedType(type.id as RecordType)}
          >
            {type.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {recordTypes.find(t => t.id === selectedType)?.label}
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {recordTypes.find(t => t.id === selectedType)?.label}</DialogTitle>
            </DialogHeader>
            <RecordForm
              type={selectedType}
              onSubmit={handleAddRecord}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
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
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                {Object.keys(record).filter(key => key !== 'id' && key !== 'type').map((key) => (
                  <TableCell key={key}>{record[key]}</TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => record.id && handleDeleteRecord(record.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={getColumns().length + 1} className="text-center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}