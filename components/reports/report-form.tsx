"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportFormProps {
  type: 'radiology' | 'laboratory';
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function ReportForm({ type, onSubmit, onCancel, initialData }: ReportFormProps) {
  const [formData, setFormData] = useState(initialData || {});

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
          value={formData.patientId || ''}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date || ''}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      {type === 'radiology' && (
        <div className="space-y-2">
          <Label htmlFor="imagingType">Imaging Type</Label>
          <Select
            value={formData.imagingType || ''}
            onValueChange={(value) => setFormData({ ...formData, imagingType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xray">X-Ray</SelectItem>
              <SelectItem value="ct">CT Scan</SelectItem>
              <SelectItem value="mri">MRI</SelectItem>
              <SelectItem value="ultrasound">Ultrasound</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {type === 'laboratory' && (
        <div className="space-y-2">
          <Label htmlFor="testType">Test Type</Label>
          <Select
            value={formData.testType || ''}
            onValueChange={(value) => setFormData({ ...formData, testType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blood">Blood Test</SelectItem>
              <SelectItem value="urine">Urine Analysis</SelectItem>
              <SelectItem value="culture">Culture Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="findings">Findings</Label>
        <Textarea
          id="findings"
          value={formData.findings || ''}
          onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
          required
        />
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