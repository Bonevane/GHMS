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
import { RecordForm } from '@/components/records/record-form';

type RecordType = 'redo' | 'blood-transfusion' | 'adverse-anesthesia' | 'surgical-site' | 'verbal-order' | 'ot-recall' | 'sterilization';

export default function RecordsPage() {
  const [selectedType, setSelectedType] = useState<RecordType>('redo');
  const [records, setRecords] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const recordTypes = [
    { id: 'redo', label: 'Redo Register' },
    { id: 'blood-transfusion', label: 'Blood Transfusion Reaction' },
    { id: 'adverse-anesthesia', label: 'Adverse Anesthesia Events' },
    { id: 'surgical-site', label: 'Surgical Site Infection' },
    { id: 'verbal-order', label: 'Verbal Orders' },
    { id: 'ot-recall', label: 'OT Recall' },
    { id: 'sterilization', label: 'Sterilization' },
  ];

  const handleAddRecords = (data: any) => {
    const newReport = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      createdAt: new Date(),
    };
    setRecords(prev => [...prev, newReport]);
    setIsDialogOpen(false);
  };

  const handleUpdateReport = (id: string, data: any) => {
    setRecords(prev =>
      prev.map(report => report.id === id ? { ...report, ...data } : report)
    );
  };

  const handleDeleteReport = (id: string) => {
    setRecords(prev => prev.filter(report => report.id !== id));
  };

  const getColumns = () => {
    switch (selectedType) {
      case 'redo':
        return ['Date', 'MR', 'Errors in Result', 'Test Redo', 'Report Not Correlating', 'Precautions Not Followed', 'Remarks'];
      case 'blood-transfusion':
        return ['SR', 'Date', 'MR', 'Diagnosis', 'Blood Group (Donor)', 'Blood Group (Verify Recipient)', 'Blood Group (Verify Donor)', 'Reaction Type', 'Possible Reaction', 'Remarks'];
      case 'adverse-anesthesia':
        return ['Date', 'MR', 'Type of Anesthesia', 'Detail of Event', 'Analysis', 'Corrective Action'];
      case 'surgical-site':
        return ['Date', 'MR', 'Doctor Name', 'Procedure', 'OT', 'Remarks'];
      case 'verbal-order':
        return ['Date', 'MR', 'Doctor Name', 'Medicine Order Verbally', 'Staff Name'];
      case 'ot-recall':
        return ['SR', 'Date', 'Batch', 'Items', 'Where To', 'Expiry Date', 'Validation Tests', 'Person Responsible', 'Notes'];
      case 'sterilization':
        return ['Batch', 'Date', 'Expiry Date', 'Pack', 'Issue Date', 'MR', 'Procedure', 'Surgeon', 'Stereotape Gauge Color Change'];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
        <p className="text-muted-foreground">
          View and manage detailed medical records
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
          {recordTypes.find(t => t.id === selectedType)?.label} Records
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
              onSubmit={handleAddRecords}
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
            {records.length === 0 && (
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