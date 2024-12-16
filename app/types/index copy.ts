export type Role = 'admin' | 'doctor' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  specialization?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  bloodGroup: string;
  medicalHistory: string[];
  appointments: Appointment[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface SurgeryRequest {
  id: string;
  patientId: string;
  doctorId: string;
  type: string;
  urgency: 'emergency' | 'urgent' | 'elective';
  scheduledDate: Date;
  status: 'pending' | 'approved' | 'completed';
}

export interface Room {
  id: string;
  number: string;
  type: 'general' | 'private' | 'icu';
  status: 'available' | 'occupied';
  patientId?: string;
}