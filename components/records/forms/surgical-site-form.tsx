"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SurgicalSiteInfection } from '@/app/types/records';

interface SurgicalSiteFormProps {
  onSubmit: (data: Partial<SurgicalSiteInfection>) => void;
  onCancel: () => void;
  initialData?: SurgicalSiteInfection;
}

export function SurgicalSiteForm({ onSubmit, onCancel, initialData }: SurgicalSiteFormProps) {
  const [formData, setFormData] = useState<Partial<SurgicalSiteInfection>>(initialData || {
    date: new Date(),
    mr: '',
    doctorName: '',
    procedure: '',
    ot: '',
    remarks: ''
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
          type="number"
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
        <Label htmlFor="procedure">Procedure</Label>
        <Input
          id="procedure"
          value={formData.procedure}
          onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ot">OT</Label>
        <Input
          id="ot"
          value={formData.ot}
          onChange={(e) => setFormData({ ...formData, ot: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
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