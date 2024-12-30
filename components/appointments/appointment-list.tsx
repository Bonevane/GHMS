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
  // Group appointments by time
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const timeKey = format(new Date(appointment.date), 'HH:mm');
    if (!acc[timeKey]) {
      acc[timeKey] = [];
    }
    acc[timeKey].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedAppointments)
        .sort(([timeA], [timeB]) => timeA.localeCompare(timeB))
        .map(([time, timeAppointments]) => (
          <div key={time} className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2">
              <h4 className="font-medium">{time}</h4>
            </div>
            <div className="divide-y">
              {timeAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="p-4 bg-card"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Patient Name: {appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        Doctor ID: {appointment.docid}
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