"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RedoRegister } from '@/app/types/records';

interface RedoFormProps {
  onSubmit: (data: Partial<RedoRegister>) => void;
  onCancel: () => void;
  initialData?: RedoRegister;
}

export function RedoForm({ onSubmit, onCancel, initialData }: RedoFormProps) {
  const [formData, setFormData] = useState<Partial<RedoRegister>>(initialData || {
    date: new Date(),
    mr: '',
    errorsInResult: '',
    testRedo: '',
    reportNotCorelating: '',
    precautionsNotFollowed: '',
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
        <Label htmlFor="errorsInResult">Errors in Result</Label>
        <Textarea
          id="errorsInResult"
          value={formData.errorsInResult}
          onChange={(e) => setFormData({ ...formData, errorsInResult: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="testRedo">Test Redo</Label>
        <Input
          id="testRedo"
          value={formData.testRedo}
          onChange={(e) => setFormData({ ...formData, testRedo: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reportNotCorelating">Report Not Correlating</Label>
        <Textarea
          id="reportNotCorelating"
          value={formData.reportNotCorelating}
          onChange={(e) => setFormData({ ...formData, reportNotCorelating: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="precautionsNotFollowed">Precautions Not Followed</Label>
        <Textarea
          id="precautionsNotFollowed"
          value={formData.precautionsNotFollowed}
          onChange={(e) => setFormData({ ...formData, precautionsNotFollowed: e.target.value })}
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