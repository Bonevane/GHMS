import { Role, User } from '@/app/types';

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Dr. Smith',
    email: 'doctor@hospital.com',
    role: 'doctor',
    department: 'Cardiology',
    specialization: 'Cardiologist',
  },
  {
    id: '3',
    name: 'John Receptionist',
    email: 'receptionist@hospital.com',
    role: 'receptionist',
  },
];

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // In a real application, this would verify credentials against a database
  const user = MOCK_USERS.find(u => u.email === email);
  return user || null;
}