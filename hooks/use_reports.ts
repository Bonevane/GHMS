import { useState, useEffect } from 'react';
import { LabReport, RadiologyReport } from '@/app/types/reports';
import supabase from '@/config/supabaseClient';

type ReportType = 'lab' | 'radiology';

interface Report extends Partial<LabReport>, Partial<RadiologyReport> {
  id: string;
  type: ReportType;
}

export function useReports() {
  const [selectedType, setSelectedType] = useState<ReportType>('lab');
  const [reports, setReports] = useState<Report[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from(selectedType)
        .select();
      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        const reportsWithType = data.map((report: any) => ({
          ...report,
          type: selectedType,
        }));
        setReports(reportsWithType as Report[]);
      }
    };

    fetchReports();
  }, [selectedType]);

  const handleAddReport = async (data: any) => {
    const { data: newReport, error } = await supabase
      .from(selectedType)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error adding report:', error);
      return;
    }

    setReports(prev => [...prev, { ...newReport, type: selectedType }]);
    setIsDialogOpen(false);
  };

  const handleUpdateReport = async (id: string, data: any) => {
    const { error } = await supabase
      .from(selectedType)
      .update(data)
      .eq('id', id);

    if (error) {
      console.error('Error updating report:', error);
      return;
    }

    setReports(prev =>
      prev.map(report => report.id === id ? { ...report, ...data } : report)
    );
  };

  const handleDeleteReport = async (id: string) => {
    const { error } = await supabase
      .from(selectedType)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting report:', error);
      return;
    }

    setReports(prev => prev.filter(report => report.id !== id));
  };

  return {
    selectedType,
    setSelectedType,
    reports,
    isDialogOpen,
    setIsDialogOpen,
    handleAddReport,
    handleUpdateReport,
    handleDeleteReport,
  };
}