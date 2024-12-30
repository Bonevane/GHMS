"use client"

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Appointment } from '@/app/types';
import { Calendar } from '@/components/ui/calendar';

interface AppointmentFormProps {
  appointment?: Appointment;
  onSubmit: (appointment: Partial<Appointment>) => void;
  onCancel: () => void;
}

export function AppointmentForm({ appointment, onSubmit, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<Appointment>>(appointment || {
    patientName: '',
    patientSex: 'Male',
    patientPhone: '',
    doctorId: '',
    date: new Date(),
    status: 'scheduled',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Patient Name</Label>
        <Input
          id="name"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={formData.patientSex}
          onValueChange={(value) => setFormData({ ...formData, patientSex: value as 'Male' | 'Female'  })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          value={formData.patientPhone}
          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="doctorId">Doctor</Label>
        <Select
          value={formData.doctorId}
          onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
            {/* Add doctor list items here */}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Calendar
          mode="single"
          selected={formData.date}
          onSelect={(date) => date && setFormData({ ...formData, date })}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as 'scheduled' | 'completed' | 'cancelled' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {appointment ? 'Update' : 'Add'} Appointment
        </Button>
      </div>
    </form>
    </ScrollArea>
  );
}