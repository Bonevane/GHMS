"use client"

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Surgery } from '@/app/types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import supabase from '@/config/supabaseClient';
import { User } from '@/app/types';
interface SurgeryFormProps {
  onSubmit: (data: Partial<Surgery>) => void;
  onCancel: () => void;
  initialData?: Surgery;
}

export function SurgeryForm({ onSubmit, onCancel, initialData }: SurgeryFormProps) {
  const [formData, setFormData] = useState<Partial<Surgery>>(initialData || {

    doa: new Date(),
    doo: new Date(),
    dod: new Date(),
    diagnosis: '',
    procedure: '',
    medicines: '',
    ac: '',
    bill: 0,
    anesthesia: '',
    file: 0,
    due: 0,
    status: 'pending',
  });
  const [doctors, setDoctors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try{
      const { data, error } = await supabase
        .from('employee') 
        .select()
        .eq('role', 'Doctor'); 
        if (error) {
          setError(error.message);
          console.error('Error fetching data:', error);
        } else {
          console.log(data)
          setDoctors(data as User[]); // Set 
          // data correctly
        }
        }
        finally {
        setIsLoading(false);
      };
    };

    fetchPatients();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="patientId">Patient ID</Label>
      <Input
        id="patientId"
        type="number"
        value={formData.reg}
        onChange={(e) => setFormData({ ...formData, reg: parseInt(e.target.value) || 0 })}
        required
      />
    </div>
    <div className="space-y-2">
        <Label htmlFor="doctorId">Doctor</Label>
        <Select
          value={formData.surgeon?.toString()}
          onValueChange={(value) => setFormData({ ...formData, surgeon: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
          {doctors.map((doctor) => (
            <SelectItem key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>
    <div className="space-y-2">
      
    </div>
    <div className="space-y-2">
      <Label htmlFor="diagnosis">Diagnosis</Label>
      <Textarea
        id="diagnosis"
        value={formData.diagnosis}
        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="procedure">Procedure</Label>
      <Textarea
        id="procedure"
        value={formData.procedure}
        onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="dateOfAdmission">Date of Admission</Label>
        <Input
          id="dateOfAdmission"
          type="date"
          value={formData.doa ? new Date(formData.doa).toISOString().split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, doa: new Date(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfOperation">Date of Operation</Label>
        <Input
          id="dateOfOperation"
          type="date"
          value={formData.doo ? new Date(formData.doo).toISOString().split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, doo: new Date(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfDischarge">Date of Discharge</Label>
        <Input
          id="dateOfDischarge"
          type="date"
          value={formData.doo ? new Date(formData.doo).toISOString().split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, dod: new Date(e.target.value) })}
          required
        />
      </div>
      
    </div>
    <div className="space-y-2">
        <Label htmlFor="consultantId">Consultant</Label>
        <Select
          value={formData.consultant?.toString()}
          onValueChange={(value) => setFormData({ ...formData, consultant: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select consultant" />
          </SelectTrigger>
          <SelectContent>
          {doctors.map((doctor) => (
            <SelectItem key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="AnesthetistId">Anesthetist</Label>
        <Select
          value={formData.consultant?.toString()}
          onValueChange={(value) => setFormData({ ...formData, anesthetist: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Anesthetist" />
          </SelectTrigger>
          <SelectContent>
          {doctors.map((doctor) => (
            <SelectItem key={doctor.id} value={doctor.id.toString()}>
              {doctor.name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>

        <div className="space-y-2">
          <Label htmlFor="medicines">Medicines</Label>
          <Input
            id="medicines"
            value={formData.medicines}
            onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ac">AC</Label>
          <Input
            id="ac"
            value={formData.ac}
            onChange={(e) => setFormData({ ...formData, ac: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bill">Bill</Label>
          <Input
            id="bill"
            type="number"
            value={formData.bill}
            onChange={(e) => setFormData({ ...formData, bill: parseFloat(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="anesthesia">Anesthesia</Label>
          <Input
            id="anesthesia"
            value={formData.anesthesia}
            onChange={(e) => setFormData({ ...formData, anesthesia: e.target.value })}
            required
          />
        </div>

        

        <div className="space-y-2">
          <Label htmlFor="due">Due</Label>
          <Input
            id="due"
            type="number"
            value={formData.due}
            onChange={(e) => setFormData({ ...formData, due: parseFloat(e.target.value) })}
            required
          />
        </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Schedule'} Surgery
        </Button>
      </div>
    </form>
    </ScrollArea>
  );
}