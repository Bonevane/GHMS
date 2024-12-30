"use client"

import { useEffect, useState } from 'react';
import { StaffList } from '@/components/staff/staff-list';
import { StaffForm } from '@/components/staff/staff-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { User } from '@/app/types';
import supabase from '@/config/supabaseClient';
export default function StaffPage() {
  const [staff, setStaff] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from('employee')
        .select();
      if (error) {
        console.error('Error fetching staff:', error);
      } else {
        setStaff(data);
      }
    };

    fetchStaff();
  }, []);
  const handleAddStaff = (data: Partial<User>) => {
    const newStaff = {
      ...data,
    } as User;
    setStaff(prev => [...prev, newStaff]);
    setIsDialogOpen(false);
  };



  const handleDeleteStaff = async (id: number) => {
    const { error } = await supabase
      .from('employee')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting staff:', error);
      return;
    }

    setStaff((prev) => prev.filter((staff) => staff.id !== id));
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">
            Manage hospital staff and their roles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <StaffForm
              onSubmit={handleAddStaff}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <StaffList
        staff={staff}
        onDelete={handleDeleteStaff}
      />
    </div>
  );
}