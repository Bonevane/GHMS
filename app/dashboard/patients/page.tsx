"use client"

import { useState } from 'react';
import { PatientList } from '@/components/patients/patient-list';
import { PatientSearch } from '@/components/patients/patient-search';
import { PatientForm } from '@/components/patients/patient-form';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { usePatients } from '@/hooks/use-patients';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Patient } from '@/app/types';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { patients, isLoading, addPatient, updatePatient, deletePatient } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = (patientData: Partial<Patient>) => {
    addPatient(patientData as Patient);
    setIsDialogOpen(false);
  };

  const handleEditPatient = (patientData: Partial<Patient>) => {
    if (selectedPatient) {
      updatePatient(selectedPatient.id, patientData as Patient);
      setSelectedPatient(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeletePatient = (patientId: string) => {
    deletePatient(patientId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">
            Manage and view patient information
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
            </DialogHeader>
            <PatientForm
              patient={selectedPatient || undefined}
              onSubmit={selectedPatient ? handleEditPatient : handleAddPatient}
              onCancel={() => {
                setSelectedPatient(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PatientSearch value={searchQuery} onChange={setSearchQuery} />
      
      <PatientList
        patients={filteredPatients}
        isLoading={isLoading}
        onEdit={(patient) => {
          setSelectedPatient(patient);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeletePatient}
      />
    </div>
  );
}