"use client"

import { Appointment } from '@/app/types';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AppointmentListProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'scheduled' | 'completed' | 'cancelled') => void;
}

export function AppointmentList({ appointments, onUpdateStatus }: AppointmentListProps) {
  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div
          key={appointment.id}
          className="p-4 rounded-lg border bg-card text-card-foreground"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Patient ID: {appointment.patientId}</p>
              <p className="text-sm text-muted-foreground">
                Doctor ID: {appointment.doctorId}
              </p>
              <p className="text-sm text-muted-foreground">
                Time: {format(appointment.date, 'h:mm a')}
              </p>
              {appointment.notes && (
                <p className="text-sm text-muted-foreground mt-2">
                  Notes: {appointment.notes}
                </p>
              )}
            </div>
            <Select
              value={appointment.status}
              onValueChange={(value) => 
                onUpdateStatus(appointment.id, value as 'scheduled' | 'completed' | 'cancelled')
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
      {appointments.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No appointments scheduled for this day
        </p>
      )}
    </div>
  );
}