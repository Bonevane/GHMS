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
    title: 'Total Staff',
    value: '125',
    icon: Users,
    change: '+4.75%',
    changeType: 'positive' as const,
  },
  {
    title: 'Total Patients',
    value: '2,345',
    icon: Calendar,
    change: '+12.5%',
    changeType: 'positive' as const,
  },
  {
    title: 'Active Cases',
    value: '156',
    icon: Activity,
    change: '-2.3%',
    changeType: 'negative' as const,
  },
  {
    title: 'Available Rooms',
    value: '23',
    icon: BedDouble,
    change: '0%',
    changeType: 'neutral' as const,
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