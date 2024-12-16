"use client"

import { useState } from 'react';
import { Room } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MOCK_ROOMS: Room[] = [
  { id: '1', number: '101', type: 'general', status: 'available' },
  { id: '2', number: '102', type: 'private', status: 'occupied', patientId: 'patient1' },
  { id: '3', number: 'ICU-1', type: 'icu', status: 'available' },
  // Add more mock rooms as needed
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