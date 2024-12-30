"use client"

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, BedDouble } from 'lucide-react';
import Link from 'next/link';
import supabase from '@/config/supabaseClient';
import { useEffect, useState } from 'react';
import { Appointment } from '@/app/types';
import { UpcomingAppointments } from '../appointments/upcoming-appointments';

const MOCK_WAITING_LIST = [
  { id: '1', name: 'Alice Johnson', time: '10:30 AM', type: 'General' },
  { id: '2', name: 'Bob Wilson', time: '11:00 AM', type: 'Emergency' },
];

const MOCK_ROOMS = [
  { id: '2', type: 'General', status: 'occupied', patient: 'Muhammad Anas' },
  { id: '4', type: 'General', status: 'occupied', patient: 'Chaudry Rehmat Ali' },
  { id: '8', type: 'General', status: 'occupied', patient: 'Fareed Ahmed' },
  { id: '5', type: 'General', status: 'occupied', patient: 'Khubaib Zamaan' },
  { id: '11', type: 'General', status: 'occupied', patient: 'Abdullah Arshad' },
  { id: '14', type: 'ICU', status: 'occupied', patient: 'Muhammad Ali' },
];

export function ReceptionistDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reception Dashboard</h2>
        <p className="text-muted-foreground">
          Current appointments list and room status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingAppointments 
          appointments={appointments} 
          onUpdateStatus={(id: string, status: string) => {
            setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: status as 'scheduled' | 'completed' | 'cancelled' } : app));
          }} 
        />  

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <BedDouble className="mr-2 h-5 w-5" />
              Room Status
            </CardTitle>
            <Link href="/dashboard/rooms">
              <Button size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_ROOMS.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">Room {room.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {room.type} - {room.status}
                    </p>
                    {room.patient && (
                      <p className="text-sm text-muted-foreground">
                        Patient: {room.patient}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}