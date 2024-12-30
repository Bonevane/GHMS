"use client"

// filepath: /d:/DBS_project/GHMS/app/dashboard/surgeries/page.tsx

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SurgeryForm } from '@/components/surgeries/surgery-form';
import { SurgeryList } from '@/components/surgeries/surgery-list';
import supabase from '@/config/supabaseClient';
import { Surgery } from '@/app/types';

// Removed local Surgery interface declaration as it conflicts with the imported one

export default function SurgeriesPage() {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSurgeries = async () => {
      const { data, error } = await supabase
        .from('surgery')
        .select();
      if (error) {
        console.error('Error fetching surgeries:', error);
      } else {
        setSurgeries(data);
      }
    };

    fetchSurgeries();
  }, []);

  const handleAddSurgery = async (surgeryData: Partial<Surgery>) => {
    const { data, error } = await supabase
      .from('surgery')
      .insert(surgeryData)
      .select()
      .single();

    if (error) {
      console.error('Error adding surgery:', error);
      return;
    }

    setSurgeries(prev => [...prev, data]);
    setIsDialogOpen(false);
  };

  const handleUpdateStatus = async (id: number, status: 'pending' | 'completed') => {
    const { error } = await supabase
      .from('surgery')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating surgery status:', error);
      return;
    }

    setSurgeries(prev =>
      prev.map(surgery => surgery.id === id ? { ...surgery, status } : surgery)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Surgeries Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              Add Surgery
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Surgery</DialogTitle>
            </DialogHeader>
            <SurgeryForm
              onSubmit={handleAddSurgery}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <SurgeryList surgeries={surgeries} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}