"use client"
import { useRouter } from "next/navigation";

import { useAuth } from '@/contexts/auth-context';
import { 
  AdminDashboard, 
  DoctorDashboard, 
  ReceptionistDashboard 
} from '@/components/dashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const router=useRouter();
  if (!user) 
    {console.log("ANUS");
    router.push("/auth/login"); // Redirect to the login page after logout

    return null;}

  switch (user.role) {
    case 'Administrator':
      return <AdminDashboard />;
    case 'Doctor':
      return <DoctorDashboard />;
    case 'Receptionist':
      return <ReceptionistDashboard />;
    default:
      return null;
  }
}