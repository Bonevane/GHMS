"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WaitingListEntry {
  name: string;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
}

interface WaitingListFormProps {
  entry?: WaitingListEntry;
  onSubmit: (entry: WaitingListEntry) => void;
  onCancel: () => void;
}

export function WaitingListForm({ entry, onSubmit, onCancel }: WaitingListFormProps) {
  const [formData, setFormData] = useState<WaitingListEntry>(entry || {
    name: '',
    gender: 'male',
    contactNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' | 'other' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          id="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {entry ? 'Update' : 'Add'} Entry
        </Button>
      </div>
    </form>
  );
}