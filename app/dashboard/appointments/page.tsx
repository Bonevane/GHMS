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
import supabase from '@/config/supabaseClient';
import { User } from '@/app/types';
interface AppointmentFormProps {
  appointment?: Appointment;
  onSubmit: (appointment: Partial<Appointment>) => void;
  onCancel: () => void;
  doctors: { id: string; name: string; availability: any }[];
}



export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fetchDoctors, setDoctors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from('employee')
          .select()
          .eq('role', 'Doctor');
        if (error) {
          setError(error.message);
          console.error('Error fetching doctors:', error);
        } else {
         
          
          setDoctors(data );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  useEffect(() => {
      const fetchAppointments = async () => {
        const { data, error } = await supabase
          .from('appointment')
          .select();
    
        if (error) {
          console.error('Error fetching appointments:', error);
        } else {
          setAppointments(data);
        }
      };
    
      fetchAppointments();
    }, []);
  const handleAddAppointment = async(appointmentData: Partial<Appointment>) => {
    const newAppointment = {
      ...appointmentData,
      status: 'scheduled',
    } as Appointment;
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
              doctors={fetchDoctors.map(doc => ({ ...doc, availability: [doc.startTime, doc.endTime] }))}
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