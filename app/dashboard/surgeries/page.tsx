"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SurgeryForm } from '@/components/surgeries/surgery-form';
import { SurgeryList } from '@/components/surgeries/surgery-list';
import { Surgery } from '@/app/types';

const MOCK_SURGERIES: Surgery[] = [
  {
    id: '1',
    patientId: 'P001',
    surgeonId: 'D001',
    type: 'Appendectomy',
    diagnosis: 'Acute appendicitis',
    procedure: 'Laparoscopic appendectomy',
    dateOfAdmission: new Date('2024-03-20'),
    dateOfOperation: new Date('2024-03-21'),
    status: 'pending',
  },
];

export default function SurgeriesPage() {
  const [surgeries, setSurgeries] = useState<Surgery[]>(MOCK_SURGERIES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSurgery = (surgeryData: Partial<Surgery>) => {
    const newSurgery = {
      ...surgeryData,
      id: Math.random().toString(36).substr(2, 9),
    } as Surgery;
    setSurgeries(prev => [...prev, newSurgery]);
    setIsDialogOpen(false);
  };

  const handleUpdateStatus = (id: string, status: 'pending' | 'approved' | 'completed') => {
    setSurgeries(prev =>
      prev.map(surgery => surgery.id === id ? { ...surgery, status } : surgery)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Surgeries</h2>
          <p className="text-muted-foreground">
            Manage and schedule surgeries
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Surgery
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Surgery</DialogTitle>
            </DialogHeader>
            <SurgeryForm
              onSubmit={handleAddSurgery}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <SurgeryList
        surgeries={surgeries}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}