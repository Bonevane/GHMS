"use client"

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    patientName: 'John Doe',
    time: new Date(2024, 2, 25, 10, 30),
    type: 'Consultation',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    time: new Date(2024, 2, 25, 14, 15),
    type: 'Follow-up',
  },
];

export function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, Dr. {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's your schedule for today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(appointment.time, 'h:mm a')} - {appointment.type}
                    </p>
                  </div>
                  <Button size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Morning Session</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 1:00 PM</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">Evening Session</p>
                <p className="text-sm text-muted-foreground">4:00 PM - 8:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}