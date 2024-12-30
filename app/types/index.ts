export type Role = "Doctor" | "Nurse" | "Receptionist" | "Administrator";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  startTime?: string;
  endTime?: string;
  phone?: string;
  qualification?: string;
  dateOfJoining?: Date;
  password?: string;
  GNUM?: string;
}
export interface LoginUser {
  id: number;
  email: string;
  password: string;
  role: Role;
  name: string;
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
  id: string,
  patientName: string,
  patientSex: string,
  patientPhone: string,
  docid:string,
  date: Date,
  startTime: string,
  status: 'scheduled' | 'completed' | 'cancelled',
  notes?: string;

  referredBy?: string; // Referring doctor or consultant
}

export interface Surgery {
  id: number;
  reg: number;
  doa: Date;
  doo: Date;
  dod: Date;
  diagnosis: string;
  procedure: string;
  surgeon: number;
  consultant?: number;
  anesthetist?: number;
  medicines?: string;
  ac?:string;
  bill?: number;
  anesthesia?: string;
  file: number;
  due: number;
  status: 'pending' | 'completed' | 'discharged';
  notes?: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'General' | 'Operation Theatre' | 'ICU';
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
