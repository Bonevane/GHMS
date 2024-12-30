"use client"

// filepath: /d:/DBS_project/GHMS/app/dashboard/surgeries/page.tsx

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SurgeryForm } from '@/components/surgeries/surgery-form';
import { SurgeryList } from '@/components/surgeries/surgery-list';
import supabase from '@/config/supabaseClient';
import { Surgery } from '@/app/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { filterSurgeries, generateMonthOptions, generateYearOptions } from '@/lib/utils/surgery-filters';

// Removed local Surgery interface declaration as it conflicts with the imported one

export default function SurgeriesPage() {
  const currentDate = new Date();
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  const handleUpdateStatus = async (id: number, status: 'pending' | 'completed' | 'discharged') => {
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

  const filteredSurgeries = filterSurgeries(surgeries, selectedYear, selectedMonth, selectedStatus);
  const monthOptions = generateMonthOptions();
  const yearOptions = generateYearOptions();

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

      <div className="flex gap-4">
        <div className="w-[150px]">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[150px]">
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[150px]">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SurgeryList surgeries={filteredSurgeries} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}