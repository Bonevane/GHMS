"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RecordForm } from '@/components/records/record-form';
import { RecordList } from '@/components/records/record-list';
import { recordTypes } from '@/lib/utils/record-types';

export default function RecordTypePage() {
  const params = useParams();
  const recordType = params.type as string;
  const [records, setRecords] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddRecord = (data: any) => {
    const newRecord = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      type: recordType,
      createdAt: new Date(),
    };
    setRecords(prev => [...prev, newRecord]);
    setIsDialogOpen(false);
  };

  const handleUpdateRecord = (id: string, data: any) => {
    setRecords(prev =>
      prev.map(record => record.id === id ? { ...record, ...data } : record)
    );
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getRecordTypeTitle = (type: string) => {
    return recordTypes[type]?.title || type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {getRecordTypeTitle(recordType)}
          </h2>
          <p className="text-muted-foreground">
            Manage and view {recordType.toLowerCase()} records
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {getRecordTypeTitle(recordType)}</DialogTitle>
            </DialogHeader>
            <RecordForm
              type={recordType}
              onSubmit={handleAddRecord}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <RecordList
        records={records}
        onUpdate={handleUpdateRecord}
        onDelete={handleDeleteRecord}
      />
    </div>
  );
}