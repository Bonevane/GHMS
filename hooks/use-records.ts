"use client"

import { useState, useEffect } from 'react';
import { LabTest,RadiologyTest } from '@/app/types';
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

export function useLabtests() {
  const [labtests, setLabtests] = useState<LabTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabtests = async () => {
      try{
      const { data, error } = await supabase
        .from('Lab') 
        .select(); 
        if (error) {
          setError(error.message);
          console.error('Error fetching data:', error);
        } else {
          console.log(data)
          setLabtests(data as LabTest[]); // Set 
          // data correctly
        }
        }
        finally {
        setIsLoading(false);
      };
    };

    fetchLabtests();
  }, []);

  const addLabtest = (labtest: LabTest) => {
    const addingLabtests = async () => {
        try{
        const { data, error } = await supabase
          .from('Lab') 
          .insert([{
            mr: labtest.id,
            date: labtest.date,
            ReferredBy: labtest.referredBy,
            TestName: labtest.testName,
            LabName: labtest.labName,
            CriticalResult: labtest.criticalResult,
            InformTo: labtest.informTo
          },
          ]); 
          if (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
          } else {
            console.log(data)
            if (data != null){
                setLabtests(data as LabTest[]); 
            }// Set 
            // data correctly
          }
          }
          finally {
          setIsLoading(false);
        };
      };
    const newLabtest = {
      ...labtest
    };
    setLabtests(prev => [...prev, newLabtest]);
  };

//   const updateLabtest = async (mr: number, updatedPatient: Patient) => {
//     try {
//       // Update the patient in the patients table
//       const { error } = await supabase
//         .from("patient")
//         .update({
//           name: updatedPatient.name,
//           sex: updatedPatient.sex,
//           phone: updatedPatient.phone,
//         })
//         .eq("mr", mr); // Assuming mr is the patient's ID
  
//       if (error) {
//         console.error("Error updating patient:", error.message);
//         return;
//       }
  
//       // Update the patient details in the patientdetails table
//       const { error: detailsError } = await supabase
//         .from("patientdetail")
//         .update({
//           age: updatedPatient.age,
//           bloodgroup: updatedPatient.bloodgroup,
//         })
//         .eq("mr", mr); // Foreign key linking to patients
  
//       if (detailsError) {
//         console.error("Error updating patient details:", detailsError.message);
//         return;
//       }
  
//       console.log("Patient updated successfully!");
  
//       // Update the local state
//       setPatients((prev) =>
//         prev.map((patient) => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
//       );
//     } catch (err) {
//       console.error("Unexpected error:", err);
//     }
//   };
  // const updatePatient = (mr: number, updatedPatient: Patient) => {
  //   console.log("Sakib Bitch")
  //   setPatients(prev =>
  //     prev.map(patient => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
  //   );
  // };
//   const deleteLabtest = async (mr: number) => {
//     try {
//       // Delete the Labtest details first (foreign key dependency)
  
//       // Delete the patient record from the patients table
//       const { error: LabtestError } = await supabase
//         .from("Lab")
//         .delete()
//         .eq("mr", mr); // Primary key in the patients table
  
//       if (LabtestError) {
//         console.error("Error deleting Labtest:", LabtestError.message);
//         return;
//       }
  
//       console.log("Labtest deleted successfully!");
  
//       // Update the local state to reflect the deletion
//       setLabtests((prev) => prev.filter((Labtest) => Labtest.mr !== mr));
//     } catch (err) {
//       console.error("Unexpected error during deletion:",err);
      
//   }
//   setLabtests(prev => prev.filter(Labtest => Labtest.mr !== mr));
//   };
  // const deleteLabtest = (mr: number) => {
  //   setLabtests(prev => prev.filter(Labtest => Labtest.mr !== mr));
  // };

  return { labtests, isLoading, addLabtest };
}





export function useRadiologytests() {
    const [labtests, setRadiologytests] = useState<LabTest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRadiologytests = async () => {
        try{
        const { data, error } = await supabase
          .from('Radiology') 
          .select(); 
          if (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
          } else {
            console.log(data)
            setRadiologytests(data as LabTest[]); // Set 
            // data correctly
          }
          }
          finally {
          setIsLoading(false);
        };
      };
  
      fetchRadiologytests();
    }, []);
  
    const addRadiologytest = (radiologytest: RadiologyTest) => {
      const addingRadiologytests = async () => {
          try{
          const { data, error } = await supabase
            .from('Lab') 
            .insert([{
              mr: radiologytest.id,
              date: radiologytest.date,
              ReferredBy: radiologytest.referredBy,
              RadiologyTestName: radiologytest.testName,
              LabName: radiologytest.labName,
              TimeIn: radiologytest.timeIn,
              TimeOut: radiologytest.timeOut
            }
            ]); 
            if (error) {
              setError(error.message);
              console.error('Error fetching data:', error);
            } else {
              console.log(data)
              if (data != null){
                  setRadiologytests(data as RadiologyTest[]); 
              }// Set 
              // data correctly
            }
            }
            finally {
            setIsLoading(false);
          };
        };
      const newRadiologytest = {
        ...radiologytest
      };
      setRadiologytests(prev => [...prev, newRadiologytest]);
    };
  
  //   const updateLabtest = async (mr: number, updatedPatient: Patient) => {
  //     try {
  //       // Update the patient in the patients table
  //       const { error } = await supabase
  //         .from("patient")
  //         .update({
  //           name: updatedPatient.name,
  //           sex: updatedPatient.sex,
  //           phone: updatedPatient.phone,
  //         })
  //         .eq("mr", mr); // Assuming mr is the patient's ID
    
  //       if (error) {
  //         console.error("Error updating patient:", error.message);
  //         return;
  //       }
    
  //       // Update the patient details in the patientdetails table
  //       const { error: detailsError } = await supabase
  //         .from("patientdetail")
  //         .update({
  //           age: updatedPatient.age,
  //           bloodgroup: updatedPatient.bloodgroup,
  //         })
  //         .eq("mr", mr); // Foreign key linking to patients
    
  //       if (detailsError) {
  //         console.error("Error updating patient details:", detailsError.message);
  //         return;
  //       }
    
  //       console.log("Patient updated successfully!");
    
  //       // Update the local state
  //       setPatients((prev) =>
  //         prev.map((patient) => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
  //       );
  //     } catch (err) {
  //       console.error("Unexpected error:", err);
  //     }
  //   };
    // const updatePatient = (mr: number, updatedPatient: Patient) => {
    //   console.log("Sakib Bitch")
    //   setPatients(prev =>
    //     prev.map(patient => (patient.mr === mr ? { ...updatedPatient, mr } : patient))
    //   );
    // };
  //   const deleteLabtest = async (mr: number) => {
  //     try {
  //       // Delete the Labtest details first (foreign key dependency)
    
  //       // Delete the patient record from the patients table
  //       const { error: LabtestError } = await supabase
  //         .from("Lab")
  //         .delete()
  //         .eq("mr", mr); // Primary key in the patients table
    
  //       if (LabtestError) {
  //         console.error("Error deleting Labtest:", LabtestError.message);
  //         return;
  //       }
    
  //       console.log("Labtest deleted successfully!");
    
  //       // Update the local state to reflect the deletion
  //       setLabtests((prev) => prev.filter((Labtest) => Labtest.mr !== mr));
  //     } catch (err) {
  //       console.error("Unexpected error during deletion:",err);
        
  //   }
  //   setLabtests(prev => prev.filter(Labtest => Labtest.mr !== mr));
  //   };
    // const deleteLabtest = (mr: number) => {
    //   setLabtests(prev => prev.filter(Labtest => Labtest.mr !== mr));
    // };
  
    return { labtests, isLoading, addRadiologytest };
  }