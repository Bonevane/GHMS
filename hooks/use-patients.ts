"use client"

import { useState, useEffect } from 'react';
import { Patient } from '@/app/types';
import supabase from '../config/supabaseClient'
// Mock data for demonstration
// const MOCK_PATIENTS: Patient[] = [
//   {
//     id: '1',
//     name: 'John Doe',
//     age: 45,
//     gender: 'male',
//     contact: '+1 234-567-8900',
//     bloodGroup: 'O+',
//     medicalHistory: ['Hypertension', 'Diabetes'],
//     appointments: [],
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     age: 32,
//     gender: 'female',
//     contact: '+1 234-567-8901',
//     bloodGroup: 'A+',
//     medicalHistory: ['Asthma'],
//     appointments: [],
//   },
// ];

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try{
      const { data, error } = await supabase
        .from('test2') 
        .select(); 
        if (error) {
          setError(error.message);
          console.error('Error fetching data:', error);
        } else {
          console.log(data)
          setPatients(data as Patient[]); // Set 
          // data correctly
        }
        }
        finally {
        setIsLoading(false);
      };
    };

    fetchPatients();
  }, []);

  const addPatient = (patient: Patient) => {
    const newPatient = {
      ...patient,
      mr: Math.random(),
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = async (mr: number, updatedPatient: Patient) => {
    try {
      // Update the patient in the patients table
      const { error } = await supabase
        .from("patient")
        .update({
          name: updatedPatient.name,
          sex: updatedPatient.sex,
          phone: updatedPatient.phone,
        })
        .eq("mr", mr); // Assuming mr is the patient's ID
  
      if (error) {
        console.error("Error updating patient:", error.message);
        return;
      }
  
      // Update the patient details in the patientdetails table
      const { error: detailsError } = await supabase
        .from("patientdetail")
        .update({
          age: updatedPatient.age,
          bloodgroup: updatedPatient.bloodgroup,
        })
        .eq("mr", mr); // Foreign key linking to patients
  
      if (detailsError) {
        console.error("Error updating patient details:", detailsError.message);
        return;
      }
  
      console.log("Patient updated successfully!");
  
      // Update the local state
      setPatients((prev) =>
        prev.map((patient) => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
      );
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  // const updatePatient = (mr: number, updatedPatient: Patient) => {
  //   console.log("Sakib Bitch")
  //   setPatients(prev =>
  //     prev.map(patient => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
  //   );
  // };
  const deletePatient = async (mr: number) => {
    try {
      // Delete the patient details first (foreign key dependency)
      const { error: detailsError } = await supabase
        .from("patientdetail")
        .delete()
        .eq("mr", mr); // Foreign key reference to the patient
  
      if (detailsError) {
        console.error("Error deleting patient details:", detailsError.message);
        return;
      }
  
      // Delete the patient record from the patients table
      const { error: patientError } = await supabase
        .from("patient")
        .delete()
        .eq("mr", mr); // Primary key in the patients table
  
      if (patientError) {
        console.error("Error deleting patient:", patientError.message);
        return;
      }
  
      console.log("Patient deleted successfully!");
  
      // Update the local state to reflect the deletion
      setPatients((prev) => prev.filter((patient) => patient.mr !== mr));
    } catch (err) {
      console.error("Unexpected error during deletion:",err);
      
  }
  setPatients(prev => prev.filter(patient => patient.mr !== mr));
  };
  // const deletePatient = (mr: number) => {
  //   setPatients(prev => prev.filter(patient => patient.mr !== mr));
  // };

  return { patients, isLoading, addPatient, updatePatient, deletePatient };
}