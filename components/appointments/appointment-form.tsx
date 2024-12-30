"use client"

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Appointment } from '@/app/types';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlotPicker } from './time-slots-picker';
import { generateTimeSlots, TimeSlot } from '@/lib/utils/time-slots';

interface AppointmentFormProps {
  appointment?: Appointment;
  onSubmit: (appointment: Partial<Appointment>) => void;
  onCancel: () => void;
  doctors: { id: string; name: string; availability: any }[];
}

export function AppointmentForm({ appointment, onSubmit, onCancel, doctors }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<Appointment>>(appointment || {
    patientName: '',
    patientSex: 'Male',
    patientPhone: '',
    docid: '',
    date: new Date(),
    status: 'scheduled',
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const handleDoctorChange = (docid: string) => {
    const doctor = doctors.find(d => d.id === docid);
    if (doctor) {
      setFormData({ ...formData, docid });
      const slots = generateTimeSlots(selectedDate, doctor.availability);
      setTimeSlots(slots);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date && formData.docid) {
      const doctor = doctors.find(d => d.id === formData.docid);
      if (doctor) {
        setSelectedDate(date);
        const slots = generateTimeSlots(date, doctor.availability);
        setTimeSlots(slots);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime) {
      const appointmentDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      appointmentDate.setHours(parseInt(hours), parseInt(minutes));
      onSubmit({ ...formData, date: appointmentDate });
    }
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
          value={formData.docid}
          onValueChange={handleDoctorChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map(doctor => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          className="rounded-md border"
        />
      </div>

      {timeSlots.length > 0 && (
        <div className="space-y-2">
          <Label>Available Time Slots</Label>
          <TimeSlotPicker
            slots={timeSlots}
            selectedSlot={selectedTime}
            onSelectSlot={setSelectedTime}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!selectedTime}>
          {appointment ? 'Update' : 'Add'} Appointment
        </Button>
      </div>
    </form>
    </ScrollArea>
  );
}










