"use client"

import { useAuth } from '@/contexts/auth-context';
import { 
  AdminDashboard, 
  DoctorDashboard, 
  ReceptionistDashboard 
} from '@/components/dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'receptionist':
      return <ReceptionistDashboard />;
    default:
      return null;
  }
}