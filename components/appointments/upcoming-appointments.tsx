"use client"

import { Appointment } from '@/app/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'scheduled' | 'completed' | 'cancelled') => void;
}

export function UpcomingAppointments({ appointments, onUpdateStatus }: UpcomingAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map(appointment => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div>
              <p className="font-medium">Patient Name: {appointment.patientName}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(appointment.date), 'MMM d, yyyy')}
              </p>
              <p className="text-sm font-medium text-primary">
                {format(new Date(appointment.date), 'h:mm a')}
              </p>
            </div>
            <Badge>{appointment.status}</Badge>
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No upcoming appointments
          </p>
        )}
      </CardContent>
    </Card>
  );
}