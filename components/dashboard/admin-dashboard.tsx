"use client"

import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Activity,
  BedDouble,
  FileText,
  BarChart2,
} from 'lucide-react';

const stats = [
  {
    title: 'Available Staff',
    value: '12',
    icon: Users,
    change: 'No leaves reported',
    changeType: 'neutral' as const,
  },
  {
    title: 'Admitted Patients',
    value: '34',
    icon: Calendar,
    change: '+12.5% from last month',
    changeType: 'positive' as const,
  },
  {
    title: 'Active Surgeries',
    value: '5',
    icon: Activity,
    change: 'No sentinel events reported',
    changeType: 'positive' as const,
  },
  {
    title: 'Available Rooms',
    value: '3',
    icon: BedDouble,
    change: 'Attention Required',
    changeType: 'negative' as const,
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Hospital performance overview and quick actions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/staff">
          <Button className="w-full h-24" variant="outline">
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 mb-2" />
              Manage Staff
            </div>
          </Button>
        </Link>
        <Link href="/dashboard/records">
          <Button className="w-full h-24" variant="outline">
            <div className="flex flex-col items-center">
              <FileText className="h-6 w-6 mb-2" />
              View Records
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}