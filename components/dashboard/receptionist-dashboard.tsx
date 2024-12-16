"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, BedDouble } from 'lucide-react';
import Link from 'next/link';

const MOCK_WAITING_LIST = [
  { id: '1', name: 'Alice Johnson', time: '10:30 AM', type: 'General' },
  { id: '2', name: 'Bob Wilson', time: '11:00 AM', type: 'Emergency' },
];

const MOCK_ROOMS = [
  { id: '101', type: 'General', status: 'Occupied', patient: 'John Doe' },
  { id: '102', type: 'ICU', status: 'Available' },
];

export function ReceptionistDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reception Dashboard</h2>
        <p className="text-muted-foreground">
          Current waiting list and room status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Current Waiting List
            </CardTitle>
            <Link href="/dashboard/waiting-list">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_WAITING_LIST.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.time} - {patient.type}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Process
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                  <Button
                    variant={room.status === 'Available' ? 'default' : 'outline'}
                    size="sm"
                  >
                    {room.status === 'Available' ? 'Allocate' : 'View'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}