"use client"

// filepath: /d:/DBS_project/GHMS/components/records/forms/blood-transfusion-form.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BloodTransfusionReaction } from '@/app/types/records';

interface BloodTransfusionFormProps {
  onSubmit: (data: Partial<BloodTransfusionReaction>) => void;
  onCancel: () => void;
  initialData?: BloodTransfusionReaction;
}

export function BloodTransfusionForm({ onSubmit, onCancel, initialData }: BloodTransfusionFormProps) {
  const [formData, setFormData] = useState<Partial<BloodTransfusionReaction>>(initialData || {
    date: new Date(),
    mr: '',
    diagnosis: '',
    bloodGroupDonor: '',
    bloodGroupOnVerifyRecipient: '',
    bloodGroupOnVerifyDonor: '',
    transfusionReactionType: '',
    possibleReaction: '',
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
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input
          id="diagnosis"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroupDonor">Blood Group Donor</Label>
        <Input
          id="bloodGroupDonor"
          value={formData.bloodGroupDonor}
          onChange={(e) => setFormData({ ...formData, bloodGroupDonor: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroupOnVerifyRecipient">Blood Group On Verify Recipient</Label>
        <Input
          id="bloodGroupOnVerifyRecipient"
          value={formData.bloodGroupOnVerifyRecipient}
          onChange={(e) => setFormData({ ...formData, bloodGroupOnVerifyRecipient: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroupOnVerifyDonor">Blood Group On Verify Donor</Label>
        <Input
          id="bloodGroupOnVerifyDonor"
          value={formData.bloodGroupOnVerifyDonor}
          onChange={(e) => setFormData({ ...formData, bloodGroupOnVerifyDonor: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transfusionReactionType">Transfusion Reaction Type</Label>
        <Input
          id="transfusionReactionType"
          value={formData.transfusionReactionType}
          onChange={(e) => setFormData({ ...formData, transfusionReactionType: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="possibleReaction">Possible Reaction</Label>
        <Input
          id="possibleReaction"
          value={formData.possibleReaction}
          onChange={(e) => setFormData({ ...formData, possibleReaction: e.target.value })}
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
          {initialData ? 'Update' : 'Add'} Record
        </Button>
      </div>
    </form>
  );
}