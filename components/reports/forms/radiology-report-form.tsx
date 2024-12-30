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
  const [formData, setFormData] = useState<Partial<RadiologyReport>>(initialData || {});

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
        <Label htmlFor="referredBy">Referred By</Label>
        <Input
          id="referredBy"
          type="number"
          value={formData.referredby}
          onChange={(e) => setFormData({ ...formData, referredby: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="radiologyTestName">Radiology Test Name</Label>
        <Input
          id="radiologyTestName"
          value={formData.radiologytestname}
          onChange={(e) => setFormData({ ...formData, radiologytestname: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="labName">Lab Name</Label>
        <Input
          id="labName"
          value={formData.labname}
          onChange={(e) => setFormData({ ...formData, labname: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeIn">Time In</Label>
          <Input
            id="timeIn"
            type="time"
            value={formData.timein ? new Date(formData.timein.toString() ).toTimeString().slice(0, 5) : ''}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const date = new Date();
              date.setHours(parseInt(hours), parseInt(minutes));
              setFormData({ ...formData, timein: date.toISOString() });
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeOut">Time Out</Label>
          <Input
            id="timeOut"
            type="time"
            value={formData.timeout ? new Date(formData.timeout.toString()).toTimeString().slice(0, 5) : ''}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const date = new Date();
              date.setHours(parseInt(hours), parseInt(minutes));
              setFormData({ ...formData, timeout: date.toISOString() });
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