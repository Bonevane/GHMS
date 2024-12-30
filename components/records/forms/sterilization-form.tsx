"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SterilizationRegister } from '@/app/types/records';

interface SterilizationFormProps {
  onSubmit: (data: Partial<SterilizationRegister>) => void;
  onCancel: () => void;
  initialData?: SterilizationRegister;
}

export function SterilizationForm({ onSubmit, onCancel, initialData }: SterilizationFormProps) {
  const [formData, setFormData] = useState<Partial<SterilizationRegister>>(initialData || {
    batch: '',
    date: new Date(),
    expiryDate: new Date(),
    pack: '',
    issueDate: new Date(),
    mr: '',
    procedure: '',
    surgeon: '',
    stereotapeGaugeColorChange: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="batch">Batch</Label>
        <Input
          id="batch"
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
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
        <Label htmlFor="pack">Pack</Label>
        <Input
          id="pack"
          value={formData.pack}
          onChange={(e) => setFormData({ ...formData, pack: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueDate">Issue Date</Label>
        <Input
          id="issueDate"
          type="date"
          value={formData.issueDate ? new Date(formData.issueDate).toISOString().split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, issueDate: new Date(e.target.value) })}
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
        <Label htmlFor="procedure">Procedure</Label>
        <Input
          id="procedure"
          value={formData.procedure}
          onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="surgeon">Surgeon</Label>
        <Input
          id="surgeon"
          value={formData.surgeon}
          onChange={(e) => setFormData({ ...formData, surgeon: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stereotapeGaugeColorChange">Stereotape Gauge Color Change</Label>
        <Input
          id="stereotapeGaugeColorChange"
          value={formData.stereotapeGaugeColorChange}
          onChange={(e) => setFormData({ ...formData, stereotapeGaugeColorChange: e.target.value })}
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