"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OTRecall } from '@/app/types/records';

interface OTRecallFormProps {
  onSubmit: (data: Partial<OTRecall>) => void;
  onCancel: () => void;
  initialData?: OTRecall;
}

export function OTRecallForm({ onSubmit, onCancel, initialData }: OTRecallFormProps) {
  const [formData, setFormData] = useState<Partial<OTRecall>>(initialData || {
    sr: '',
    date: new Date(),
    batch: '',
    items: '',
    whereTo: '',
    expiryDate: new Date(),
    sterilizationValidationTests: '',
    personResponsible: '',
    recallNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sr">SR#</Label>
        <Input
          id="sr"
          value={formData.sr}
          onChange={(e) => setFormData({ ...formData, sr: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate ? new Date(formData.expiryDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, expiryDate: new Date(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="batch">Batch</Label>
        <Input
          id="batch"
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="items">Items</Label>
        <Input
          id="items"
          value={formData.items}
          onChange={(e) => setFormData({ ...formData, items: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whereTo">Where To</Label>
        <Input
          id="whereTo"
          value={formData.whereTo}
          onChange={(e) => setFormData({ ...formData, whereTo: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sterilizationValidationTests">Sterilization Validation Tests</Label>
        <Input
          id="sterilizationValidationTests"
          value={formData.sterilizationValidationTests}
          onChange={(e) => setFormData({ ...formData, sterilizationValidationTests: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="personResponsible">Person Responsible</Label>
        <Input
          id="personResponsible"
          value={formData.personResponsible}
          onChange={(e) => setFormData({ ...formData, personResponsible: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recallNotes">Recall Notes</Label>
        <Textarea
          id="recallNotes"
          value={formData.recallNotes}
          onChange={(e) => setFormData({ ...formData, recallNotes: e.target.value })}
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