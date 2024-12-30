"use client"

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { AppointmentList } from '@/components/appointments/appointment-list';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { Appointment } from '@/app/types';

// Mock doctors data
const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Smith',
    availability: {
      doctorId: '1',
      shifts: [
        { startTime: '09:00', endTime: '13:00' },
        { startTime: '14:00', endTime: '17:00' }
      ]
    }
  },
  {
    id: '2',
    name: 'Dr. Johnson',
    availability: {
      doctorId: '2',
      shifts: [
        { startTime: '10:00', endTime: '14:00' },
        { startTime: '15:00', endTime: '18:00' }
      ]
    }
  }
];

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Nigger',
    patientSex: 'Male',
    patientPhone: '02304204',
    doctorId: '1',
    date: new Date(),
    status: 'scheduled',
  },
  {
    id: '2',
    patientName: 'dumbass',
    patientSex: 'Male',
    patientPhone: '02304204',
    doctorId: '1',
    date: new Date(),
    status: 'completed',
  },
  { 
    id: '3',
    patientName: 'ong',
    patientSex: 'Male',
    patientPhone: '52323552',
    doctorId: '2',
    date: new Date(),
    status: 'scheduled',
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleAddAppointment = (appointmentData: Partial<Appointment>) => {
    const newAppointment = {
      ...appointmentData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'scheduled',
    } as Appointment;
    
    setAppointments(prev => [...prev, newAppointment]);
    setIsDialogOpen(false);
  };

  const handleUpdateStatus = (id: string, status: 'scheduled' | 'completed' | 'cancelled') => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status } : apt)
    );
  };

  const filteredAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === selectedDate.toDateString() && apt.status !== 'cancelled'
  );

  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">
            Manage and schedule appointments
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <AppointmentForm
              onSubmit={handleAddAppointment}
              onCancel={() => setIsDialogOpen(false)}
              doctors={MOCK_DOCTORS}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
          <div className="mt-6">
            <h3 className="font-semibold mb-4">
              Appointments for {selectedDate.toLocaleDateString()}
            </h3>
            <AppointmentList
              appointments={filteredAppointments}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </div>
        <div>
          <UpcomingAppointments
            appointments={upcomingAppointments}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </div>
  );
}