"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RecordList } from '@/components/records/record-list';
import { RecordForm } from '@/components/records/record-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { recordTypes } from '@/lib/utils/record-types';

type RecordType = keyof typeof recordTypes;

export default function RecordsPage() {
  const [selectedType, setSelectedType] = useState<RecordType>('redo');
  const [records, setRecords] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddRecord = (data: any) => {
    const newRecord = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
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

  const filteredRecords = records.filter(record => record.type === selectedType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
        <p className="text-muted-foreground">
          View and manage detailed medical records
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(recordTypes).map(([type, { title }]) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(type as RecordType)}
          >
            {title}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {recordTypes[selectedType].title} Records
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
              <DialogTitle>Add New {recordTypes[selectedType].title}</DialogTitle>
            </DialogHeader>
            <RecordForm
              type={selectedType}
              onSubmit={handleAddRecord}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <RecordList
        records={filteredRecords}
        onUpdate={handleUpdateRecord}
        onDelete={handleDeleteRecord}
      />
    </div>
  );
}