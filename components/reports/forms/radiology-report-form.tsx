"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadiologyReport } from '@/app/types/reports';

interface RadiologyReportFormProps {
  onSubmit: (data: Partial<RadiologyReport>) => void;
  onCancel: () => void;
  initialData?: RadiologyReport;
}

export function RadiologyReportForm({ onSubmit, onCancel, initialData }: RadiologyReportFormProps) {
  const [formData, setFormData] = useState<Partial<RadiologyReport>>(initialData || {
    date: new Date(),
    mr: '',
    referredBy: '',
    radiologyTestName: '',
    labName: '',
    timeIn: new Date(),
    timeOut: new Date()
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
        <Label htmlFor="referredBy">Referred By</Label>
        <Input
          id="referredBy"
          value={formData.referredBy}
          onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="radiologyTestName">Radiology Test Name</Label>
        <Input
          id="radiologyTestName"
          value={formData.radiologyTestName}
          onChange={(e) => setFormData({ ...formData, radiologyTestName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="labName">Lab Name</Label>
        <Input
          id="labName"
          value={formData.labName}
          onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeIn">Time In</Label>
          <Input
            id="timeIn"
            type="time"
            value={formData.timeIn ? new Date(formData.timeIn).toTimeString().slice(0, 5) : ''}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const date = new Date();
              date.setHours(parseInt(hours), parseInt(minutes));
              setFormData({ ...formData, timeIn: date });
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeOut">Time Out</Label>
          <Input
            id="timeOut"
            type="time"
            value={formData.timeOut ? new Date(formData.timeOut).toTimeString().slice(0, 5) : ''}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const date = new Date();
              date.setHours(parseInt(hours), parseInt(minutes));
              setFormData({ ...formData, timeOut: date });
            }}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Report
        </Button>
      </div>
    </form>
  );
}