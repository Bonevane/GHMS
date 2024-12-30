"use client"

import { useState ,useEffect} from 'react';
import { User } from '@/app/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Appointment } from '@/app/types';
import { Calendar } from '@/components/ui/calendar';
import { TimeSlotPicker } from './time-slots-picker';
import { generateTimeSlots, TimeSlot } from '@/lib/utils/time-slots';
import supabase from '@/config/supabaseClient';
import { time } from 'console';

type AppointmentFormProps = {
  appointment?: Partial<Appointment>;
  onSubmit: (appointment: Appointment) => void;
  onCancel: () => void;
  doctors: User[];
};

export function AppointmentForm({ appointment, onSubmit, onCancel, doctors }: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<Appointment>>(appointment || {
    patientName: '',
    patientSex: 'Male',
    patientPhone: '',
    date: new Date(),
    status: 'scheduled',
    startTime: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const handleDoctorChange = (docid: string) => {
    const doctor = doctors.find(d => d.id === Number(docid));
    if (doctor) {
      setFormData({ ...formData, docid });
      if (doctor.startTime && doctor.endTime) {
        const slots = generateTimeSlots(selectedDate, doctor.startTime, doctor.endTime);
        if (doctor.startTime && doctor.endTime) {
          const slots = generateTimeSlots(selectedDate, doctor.startTime, doctor.endTime);
          setTimeSlots(slots);
        }
      }
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date && formData.docid) {
      const doctor = doctors.find(d => d.id === Number(formData.docid));
      if (doctor) {
        setSelectedDate(date);
        if (doctor.startTime && doctor.endTime) {
          const slots = generateTimeSlots(date, doctor.startTime, doctor.endTime);
          setTimeSlots(slots);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime) {
      const appointmentDate = new Date(selectedDate);
      const newAppointment = { ...formData ,startTime:selectedTime};
      const { data, error } = await supabase
        .from('appointment')
        .insert(newAppointment)
        .select()
        .single();
  
      if (error) {
        console.error('Error adding appointment:', error);
        return;
      }
      onSubmit(data);
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
              <SelectItem key={doctor.id} value={doctor.id.toString()}>
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


