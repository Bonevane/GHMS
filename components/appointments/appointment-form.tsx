"use client"

import { useState } from 'react';
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
    patientId: '',
    doctorId: '',
    date: new Date(),
    status: 'scheduled',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient</Label>
        <Select
          value={formData.patientId}
          onValueChange={(value) => setFormData({ ...formData, patientId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            {/* Add patient list items here */}
          </SelectContent>
        </Select>
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
  );
}