"use client"

import { useState, useEffect } from 'react';
import { Patient } from '@/app/types';

// Mock data for demonstration
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    contact: '+1 234-567-8900',
    bloodGroup: 'O+',
    medicalHistory: ['Hypertension', 'Diabetes'],
    appointments: [],
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'female',
    contact: '+1 234-567-8901',
    bloodGroup: 'A+',
    medicalHistory: ['Asthma'],
    appointments: [],
  },
];

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPatients(MOCK_PATIENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = (patient: Patient) => {
    const newPatient = {
      ...patient,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id: string, updatedPatient: Patient) => {
    setPatients(prev =>
      prev.map(patient => (patient.id === id ? { ...updatedPatient, id } : patient))
    );
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  return { patients, isLoading, addPatient, updatePatient, deletePatient };
}