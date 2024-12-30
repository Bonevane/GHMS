"use client"

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { AppointmentList } from '@/components/appointments/appointment-list';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { Appointment } from '@/app/types';
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/auth-context';
import supabase from '@/config/supabaseClient';
// Mock appointments data
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Nigger',
    patientSex: 'Male',
    patientPhone: '02304204',
    docid: '1',
    date: new Date(),
    status: 'scheduled',
    notes: 'Regular checkup'
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddAppointment = async(appointmentData: Partial<Appointment>) => {
    const newAppointment = {
      ...appointmentData,
    } as Appointment;
    const { data, error } = await supabase
      .from('appointment')
      .insert(newAppointment)
      .select()
      .single();

    if (error) {
      console.error('Error adding surgery:', error);
      return;
    }
    setIsDialogOpen(false);
    setAppointments(prev => [...prev, newAppointment]);
    setIsDialogOpen(false);
  };
   
  const handleUpdateStatus = async (id: string, status: 'scheduled' | 'completed' | 'cancelled') => {
    if (status === 'completed' || status === 'cancelled') {
      const { error } = await supabase
        .from('appointment')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting appointment:', error);
        return;
      }

      setAppointments(prev => prev.filter(apt => apt.id !== id));
    } else {
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status } : apt)
      );
    }
  };
  
  const filteredAppointments = selectedDate
    ? appointments.filter(apt => 
        format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : appointments;

  const upcomingAppointments = appointments
    .filter(apt => apt.date > new Date() && apt.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

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
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <div className="mt-6">
            <h3 className="font-semibold mb-4">
              Appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Today'}
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