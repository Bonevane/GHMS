"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Room } from '@/app/types';

interface RoomFormProps {
  onSubmit: (data: Partial<Room>) => void;
  onCancel: () => void;
  initialData?: Room;
}

export function RoomForm({ onSubmit, onCancel, initialData }: RoomFormProps) {
  const [formData, setFormData] = useState<Partial<Room>>(initialData || {
    number: '',
    type: 'general',
    status: 'available',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="number">Room Number</Label>
        <Input
          id="number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Room Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as Room['type'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Ward</SelectItem>
            <SelectItem value="private">Private Room</SelectItem>
            <SelectItem value="icu">ICU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Room
        </Button>
      </div>
    </form>
  );
}