"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Surgery } from '@/app/types';

interface SurgeryFormProps {
  onSubmit: (data: Partial<Surgery>) => void;
  onCancel: () => void;
  initialData?: Surgery;
}

export function SurgeryForm({ onSubmit, onCancel, initialData }: SurgeryFormProps) {
  const [formData, setFormData] = useState<Partial<Surgery>>(initialData || {
    patientId: '',
    surgeonId: '',
    type: '',
    diagnosis: '',
    procedure: '',
    dateOfAdmission: new Date(),
    dateOfOperation: new Date(),
    status: 'pending',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient ID</Label>
        <Input
          id="patientId"
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="surgeonId">Surgeon ID</Label>
        <Input
          id="surgeonId"
          value={formData.surgeonId}
          onChange={(e) => setFormData({ ...formData, surgeonId: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Surgery Type</Label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Textarea
          id="diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="procedure">Procedure</Label>
        <Textarea
          id="procedure"
          value={formData.procedure}
          onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfAdmission">Date of Admission</Label>
          <Input
            id="dateOfAdmission"
            type="date"
            value={formData.dateOfAdmission ? new Date(formData.dateOfAdmission).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, dateOfAdmission: new Date(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfOperation">Date of Operation</Label>
          <Input
            id="dateOfOperation"
            type="date"
            value={formData.dateOfOperation ? new Date(formData.dateOfOperation).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, dateOfOperation: new Date(e.target.value) })}
            required
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Schedule'} Surgery
        </Button>
      </div>
    </form>
  );
}