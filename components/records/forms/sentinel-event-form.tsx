"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SentinelEvent } from '@/app/types/records';

interface SentinelEventFormProps {
  onSubmit: (data: Partial<SentinelEvent>) => void;
  onCancel: () => void;
  initialData?: SentinelEvent;
}

export function SentinelEventForm({ onSubmit, onCancel, initialData }: SentinelEventFormProps) {
  const [formData, setFormData] = useState<Partial<SentinelEvent>>(initialData || {
    date: new Date(),
    eventSummary: '',
    personFactor: '',
    actionToken: '',
    preventiveMeasure: '',
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
        <Label htmlFor="eventSummary">Event Summary</Label>
        <Input
          id="eventSummary"
          value={formData.eventSummary}
          onChange={(e) => setFormData({ ...formData, eventSummary: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="personFactor">Person Factor</Label>
        <Input
          id="personFactor"
          value={formData.personFactor}
          onChange={(e) => setFormData({ ...formData, personFactor: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="actionToken">Action Token</Label>
        <Input
          id="actionToken"
          value={formData.actionToken}
          onChange={(e) => setFormData({ ...formData, actionToken: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preventiveMeasure">Preventive Measure</Label>
        <Input
          id="preventiveMeasure"
          value={formData.preventiveMeasure}
          onChange={(e) => setFormData({ ...formData, preventiveMeasure: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Input
          id="remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Event
        </Button>
      </div>
    </form>
  );
}