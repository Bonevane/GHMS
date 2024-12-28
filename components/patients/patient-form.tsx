"use client"

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import supabase from '../config/supabaseClient';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Partial<Patient>) => void;
  onCancel: () => void;
}

export function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<Partial<Patient>>(patient || {
    mr : 0,
    name: '',
    age: 0,
    sex: 'Male',
    phone: '',
    bloodgroup: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (patient) {
      // Update existing patient
      const { error: patientUpdateError } = await supabase
        .from("patient")
        .update({
          name: formData.name,
          sex: formData.sex,
          phone: formData.phone,
        })
        .eq("mr", patient.mr); // Match the patient's unique identifier
  
      if (patientUpdateError) {
        console.error("Error updating patient:", patientUpdateError.message);
        return;
      }
  
      const { error: detailsUpdateError } = await supabase
        .from("patientdetail")
        .update({
          age: formData.age,
          bloodgroup: formData.bloodgroup,
        })
        .eq("mr", patient.mr); // Match the patient's unique identifier
  
      if (detailsUpdateError) {
        console.error("Error updating patient details:", detailsUpdateError.message);
        return;
      }
  
      console.log("Patient and details updated successfully!");
    } else {
      // Insert new patient
      const { data: patientData, error: patientError } = await supabase
        .from("patient")
        .insert([
          {
            name: formData.name,
            sex: formData.sex,
            phone: formData.phone,
          },
        ])
        .select();
  
      if (patientError) {
        console.error("Error inserting into patients table:", patientError.message);
        return;
      }
  
      const patientId = patientData[0].mr;
  
      const { error: detailsError } = await supabase
        .from("patientdetail")
        .insert([
          {
            mr: patientId,
            age: formData.age,
            bloodgroup: formData.bloodgroup,
          },
        ]);
  
      if (detailsError) {
        console.error("Error inserting into patientdetails table:", detailsError.message);
        return;
      }
  
      console.log("Patient and details inserted successfully!");
      formData.mr = patientId; // Update the form data with the new patient's ID
    }
  
    onSubmit(formData); // Pass updated form data back to the parent component
  };
  
  
  return (
    <ScrollArea className="h-[500px] pr-4">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={formData.sex}
          onValueChange={(value) => setFormData({ ...formData, sex: value as 'Male' | 'Female'  })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Input
          id="bloodGroup"
          value={formData.bloodgroup}
          onChange={(e) => setFormData({ ...formData, bloodgroup: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {patient ? 'Update' : 'Add'} Patient
        </Button>
      </div>
    </form>
    </ScrollArea>
  );
}