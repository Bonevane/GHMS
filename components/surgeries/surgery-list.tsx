"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Surgery } from '@/app/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface SurgeryListProps {
  surgeries: Surgery[];
  onUpdateStatus: (id: number, status: 'pending' | 'completed') => void;
}

export function SurgeryList({ surgeries, onUpdateStatus }: SurgeryListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Surgeon</TableHead>
            <TableHead>Operation Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surgeries.map((surgery) => (
            <TableRow key={surgery.id}>
              <TableCell>{surgery.id}</TableCell>
              <TableCell>{surgery.surgeon}</TableCell>
              <TableCell>{format(new Date(surgery.doo), 'PPP')}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(surgery.status)}>
                  {surgery.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {surgery.status === 'pending' && (

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStatus(surgery.id, 'completed')}
                  >
                    Mark Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}