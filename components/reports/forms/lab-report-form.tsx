"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LabReport } from '@/app/types/reports';

interface LabReportFormProps {
  onSubmit: (data: Partial<LabReport>) => void;
  onCancel: () => void;
  initialData?: LabReport;
}
export function LabReportForm({ onSubmit, onCancel, initialData }: LabReportFormProps) {
  const [formData, setFormData] = useState<Partial<LabReport>>(initialData || {})
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="testName">Test Name</Label>
        <Input
          id="testName"
          value={formData.testname}
          onChange={(e) => setFormData({ ...formData, testname: e.target.value })}
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

      <div className="flex items-center space-x-2">
        <Switch
          id="criticalResult"
          checked={formData.criticalresult}
          onCheckedChange={(checked) => setFormData({ ...formData, criticalresult: checked })}
        />
        <Label htmlFor="criticalResult">Critical Result</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="informTo">Inform To</Label>
        <Input
          id="informTo"
          type="number"
          value={formData.informto}
          onChange={(e) => setFormData({ ...formData, informto: e.target.value })}
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