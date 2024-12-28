"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VerbalOrder } from '@/app/types/records';

interface VerbalOrderFormProps {
  onSubmit: (data: Partial<VerbalOrder>) => void;
  onCancel: () => void;
  initialData?: VerbalOrder;
}

export function VerbalOrderForm({ onSubmit, onCancel, initialData }: VerbalOrderFormProps) {
  const [formData, setFormData] = useState<Partial<VerbalOrder>>(initialData || {
    date: new Date(),
    mr: '',
    doctorName: '',
    medicineOrderVerbally: '',
    staffName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mr">MR#</Label>
        <Input
          id="mr"
          value={formData.mr}
          onChange={(e) => setFormData({ ...formData, mr: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctorName">Doctor Name</Label>
        <Input
          id="doctorName"
          value={formData.doctorName}
          onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicineOrderVerbally">Medicine Order (Verbal)</Label>
        <Input
          id="medicineOrderVerbally"
          value={formData.medicineOrderVerbally}
          onChange={(e) => setFormData({ ...formData, medicineOrderVerbally: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="staffName">Staff Name</Label>
        <Input
          id="staffName"
          value={formData.staffName}
          onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Record
        </Button>
      </div>
    </form>
  );
}