"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BloodTransfusionReaction } from '@/app/types/records';

interface BloodTransfusionFormProps {
  onSubmit: (data: Partial<BloodTransfusionReaction>) => void;
  onCancel: () => void;
  initialData?: BloodTransfusionReaction;
}

export function BloodTransfusionForm({ onSubmit, onCancel, initialData }: BloodTransfusionFormProps) {
  const [formData, setFormData] = useState<Partial<BloodTransfusionReaction>>(initialData || {
    sr: '',
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
        <Label htmlFor="sr">SR#</Label>
        <Input
          id="sr"
          value={formData.sr}
          onChange={(e) => setFormData({ ...formData, sr: e.target.value })}
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
        <Label htmlFor="mr">MR#</Label>
        <Input
          id="mr"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bloodGroupDonor">Blood Group (Donor)</Label>
          <Input
            id="bloodGroupDonor"
            value={formData.bloodGroupDonor}
            onChange={(e) => setFormData({ ...formData, bloodGroupDonor: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroupOnVerifyRecipient">Blood Group (Verify Recipient)</Label>
          <Input
            id="bloodGroupOnVerifyRecipient"
            value={formData.bloodGroupOnVerifyRecipient}
            onChange={(e) => setFormData({ ...formData, bloodGroupOnVerifyRecipient: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bloodGroupOnVerifyDonor">Blood Group (Verify Donor)</Label>
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
        <Textarea
          id="possibleReaction"
          value={formData.possibleReaction}
          onChange={(e) => setFormData({ ...formData, possibleReaction: e.target.value })}
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