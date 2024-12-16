"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Hospital,
  BedDouble,
  Clock,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Hospital },
  { name: 'Staff', href: '/dashboard/staff', icon: Users },
  { name: 'Records', href: '/dashboard/records', icon: FileText },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const doctorNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Hospital },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Patients', href: '/dashboard/patients', icon: Users },
  { name: 'Surgeries', href: '/dashboard/surgeries', icon: Stethoscope },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart2 },
];

const receptionistNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Hospital },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Waiting List', href: '/dashboard/waiting-list', icon: Clock },
  { name: 'Rooms', href: '/dashboard/rooms', icon: BedDouble },
  { name: 'Surgeries', href: '/dashboard/surgeries', icon: Stethoscope },
];

export function SidebarNav() {
  const { user, logout } = useAuth();

  const navigation = user?.role === 'admin'
    ? adminNavigation
    : user?.role === 'doctor'
    ? doctorNavigation
    : receptionistNavigation;

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Hospital className="h-6 w-6 text-primary" />
        <span className="ml-2 font-semibold">Hospital MS</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}