export type Role = 'admin' | 'doctor' | 'receptionist' | 'nurse' | 'lab_technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string; // For roles like nurse or lab technician
  specialization?: string; // For roles like doctor or consultant
  phone?: string;
  qualification?: string;
  dateOfJoining?: Date;
}

export interface Patient {
  mr: number;
  name: string;
  age: number;
  sex: 'Male' | 'Female';
  phone: string;
  bloodgroup: string;
  // weight?: number;
  // height?: number;
  // address?: string;
  // district?: string;
  // medicalHistory: string[];
  // appointments: Appointment[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  referredBy?: string; // Referring doctor or consultant
}

export interface Surgery {
  id: string;
  patientId: string;
  surgeonId: string;
  consultantId?: string;
  anesthetistId?: string;
  type: string;
  diagnosis: string;
  procedure: string;
  dateOfAdmission: Date;
  dateOfOperation: Date;
  dateOfDischarge?: Date;
  medicines?: string[];
  anesthesiaType?: string;
  status: 'pending' | 'approved' | 'completed';
  bill?: number;
  notes?: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'general' | 'private' | 'icu';
  status: 'available' | 'occupied';
  patientId?: string;
}

export interface LabTest {
  id: string;
  patientId: string;
  referredBy: string;
  testName: string;
  labName: string;
  date: Date;
  criticalResult?: boolean;
  informTo?: string; // Employee ID to inform about critical results
}

export interface RadiologyTest {
  id: string;
  patientId: string;
  referredBy: string;
  testName: string;
  labName: string;
  date: Date;
  timeIn?: Date;
  timeOut?: Date;
}

export interface EmergencyRegister {
  id: string;
  patientId: string;
  initialDiagnosis: string;
  reportedTo: string; // Employee ID
  fee: number;
  disposal: string;
  receptionistName: string;
}

export interface AdverseAnesthesiaEvent {
  id: string;
  patientId: string;
  date: Date;
  typeOfAnesthesia: string;
  details: string;
  analysis: string;
  correctiveActions: string;
}

export interface BloodTransfusionReaction {
  id: string;
  patientId: string;
  date: Date;
  diagnosis: string;
  bloodGroupDonor: string;
  bloodGroupRecipient: string;
  reactionType: string;
  possibleCause: string;
  remarks?: string;
}

export interface InfectionControlMonitoring {
  id: string;
  date: Date;
  generalCleanliness: boolean;
  handHygiene: boolean;
  ppeAvailability: boolean;
  wasteSegregation: boolean;
  wasteDisposal: boolean;
  remarks?: string;
}
