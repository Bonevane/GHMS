"use client"

import { useState } from 'react';
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
    name: '',
    age: 0,
    sex: 'Male',
    phone: '',
    bloodgroup: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Step 1: Insert into patients table
    const { data: patientData, error: patientError } = await supabase
      .from("patient")
      .insert([
        {
          name: formData.name,
          sex: formData.sex,
          phone: formData.phone,
        },
      ])
      .select(); // Use select() to get the inserted patient's ID.
  
    if (patientError) {
      console.error("Error inserting into patients table:", patientError.message);
      return;
    }
  
    // Retrieve the auto-incremented ID
    const patientId = patientData[0].mr; // Assumes only one record is inserted.
  
    // Step 2: Insert into patientdetails table
    const { error: detailsError } = await supabase
      .from("patientdetail")
      .insert([
        {
          mr: patientId, // Use the foreign key
          age: formData.age,
          bloodgroup: formData.bloodgroup,
        },
      ]);
  
    if (detailsError) {
      console.error("Error inserting into patientdetails table:", detailsError.message);
      return;
    }
  
    console.log("Patient and details inserted successfully!");
  
    // Optional: Reset form or call parent onSubmit
    onSubmit(formData);
  };
  
  return (
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
  );
}