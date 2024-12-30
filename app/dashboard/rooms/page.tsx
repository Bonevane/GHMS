"use client"

import { useState } from 'react';
import { Room } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK_ROOMS: Room[] = [
  { id: '1', number: '1', type: 'General', status: 'available' },
  { id: '2', number: '2', type: 'General', status: 'occupied', patientId: '13' },
  { id: '3', number: '3', type: 'General', status: 'available' },
  { id: '4', number: '4', type: 'General', status: 'occupied', patientId: '21' },
  { id: '8', number: '8', type: 'General', status: 'occupied', patientId: '7' },
  { id: '9', number: '9', type: 'General', status: 'available' },
  { id: '5', number: '5', type: 'General', status: 'occupied', patientId: '2' },
  { id: '6', number: '6', type: 'General', status: 'available' },
  { id: '7', number: '7', type: 'General', status: 'available' },
  { id: '10', number: '10', type: 'General', status: 'available' },
  { id: '11', number: '11', type: 'General', status: 'occupied', patientId: '4' },
  { id: '12', number: 'OT-01', type: 'Operation Theatre', status: 'available' },
  { id: '13', number: 'OT-02', type: 'Operation Theatre', status: 'available' },
  { id: '14', number: 'ER-01', type: 'ICU', status: 'occupied', patientId: '3'},
  { id: '15', number: 'ER-02', type: 'ICU', status: 'available' },
  { id: '16', number: 'ER-03', type: 'ICU', status: 'available' }
];

export default function RoomsPage() {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
        <p className="text-muted-foreground">
          View and manage hospital room allocations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Room {room.number}</CardTitle>
              <Badge
                variant={room.status === 'available' ? 'default' : 'secondary'}
              >
                {room.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>Type: {room.type}</p>
                {room.patientId && <p>Patient ID: {room.patientId}</p>}
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={room.status === 'occupied'}
                >
                  {room.status === 'available' ? 'Allocate Room' : 'View Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}