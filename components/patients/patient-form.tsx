"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Partial<Patient>) => void;
  onCancel: () => void;
}

export function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<Partial<Patient>>(patient || {
    name: '',
    age: 0,
    gender: 'male',
    contact: '',
    bloodGroup: '',
    medicalHistory: [],
    appointments: []
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
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
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
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Input
          id="bloodGroup"
          value={formData.bloodGroup}
          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {patient ? 'Update' : 'Add'} Patient
        </Button>
      </div>
    </form>
  );
}