"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdverseAnesthesiaEvent } from '@/app/types/records';

interface AdverseAnesthesiaFormProps {
  onSubmit: (data: Partial<AdverseAnesthesiaEvent>) => void;
  onCancel: () => void;
  initialData?: AdverseAnesthesiaEvent;
}

export function AdverseAnesthesiaForm({ onSubmit, onCancel, initialData }: AdverseAnesthesiaFormProps) {
  const [formData, setFormData] = useState<Partial<AdverseAnesthesiaEvent>>(initialData || {
    date: new Date(),
    mr: '',
    typeOfAnesthesia: '',
    detailOfEvent: '',
    analysis: '',
    correctiveAction: '',
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
        <Label htmlFor="typeOfAnesthesia">Type of Anesthesia</Label>
        <Input
          id="typeOfAnesthesia"
          value={formData.typeOfAnesthesia}
          onChange={(e) => setFormData({ ...formData, typeOfAnesthesia: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detailOfEvent">Detail of Event</Label>
        <Textarea
          id="detailOfEvent"
          value={formData.detailOfEvent}
          onChange={(e) => setFormData({ ...formData, detailOfEvent: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="analysis">Analysis</Label>
        <Textarea
          id="analysis"
          value={formData.analysis}
          onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correctiveAction">Corrective Action</Label>
        <Textarea
          id="correctiveAction"
          value={formData.correctiveAction}
          onChange={(e) => setFormData({ ...formData, correctiveAction: e.target.value })}
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