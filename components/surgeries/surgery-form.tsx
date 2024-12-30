"use client"

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Surgery } from '@/app/types';
import supabase from '@/config/supabaseClient';
import { Patient } from '@/app/types';
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
    consultant: '',
    anesthetist: '',
    medicines: '',
    ac: '',
    bill: 0,
    anesthesia: '',
    file: 0,
    due: 0,
    status: 'pending',
  });
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
      <Label htmlFor="surgeonId">Surgeon ID</Label>
      <Input
        id="surgeonId"
        type="number"
        value={formData.surgeon}
        onChange={(e) => setFormData({ ...formData, surgeon: parseInt(e.target.value) || 0 })}
        required
      />
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
          <Label htmlFor="consultant">Consultant</Label>
          <Input
            id="consultant"
            value={formData.consultant}
            onChange={(e) => setFormData({ ...formData, consultant: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="anesthetist">Anesthetist</Label>
          <Input
            id="anesthetist"
            value={formData.anesthetist}
            onChange={(e) => setFormData({ ...formData, anesthetist: e.target.value })}
            required
          />
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