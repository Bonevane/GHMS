"use client"

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Role } from '@/app/types';
import supabase from '@/config/supabaseClient';
interface StaffFormProps {
  staff?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
}

export function StaffForm({ staff, onSubmit, onCancel }: StaffFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(staff || {
    name: '',
    email: '',
    role: 'Doctor',
    phone: '',
    qualification: '',
    password: '',
    GNUM: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('employee')
      .insert(formData)
      .select()
      .single();

    if (error) {
      console.error('Error adding staff:', error);
      return;
    }

    onSubmit(data);
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value as Role })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Doctor">Doctor</SelectItem>
            <SelectItem value="Nurse">Nurse</SelectItem>
            <SelectItem value="Receptionist">Receptionist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {(formData.role === 'Doctor' || formData.role === 'Nurse') && (
          <div className="space-y-2">
            <Label htmlFor="GNUM">{formData.role === 'Doctor' ? 'PMC' : 'PNC'}</Label>
            <Input
              id="GNUM"
              value={formData.GNUM}
              onChange={(e) => setFormData({ ...formData, GNUM: e.target.value })}
              required
            />
          </div>
        )}
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type='phone'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          type="time"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification</Label>
        <Input
          id="qualification"
          value={formData.qualification}
          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {staff ? 'Update' : 'Add'} Staff Member
        </Button>
      </div>
    </form>
    </ScrollArea>
  );
}