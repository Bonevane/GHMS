import { useState, useEffect } from 'react';
import {
  AdverseAnesthesiaEvent,
  SterilizationRegister,
  SentinelEvent,
  BloodTransfusionReaction,
  SurgicalSiteInfection,
  VerbalOrder,
  OTRecall,
  RedoRegister
} from '@/app/types/records';
import supabase from '@/config/supabaseClient';

type RecordType = 'adverseAnesthesiaEvent' | 'sterilizationRegister' | 'sentinelEvent' | 'bloodTransfusionReaction' | 'surgicalSiteInfection' | 'verbalOrder' | 'otRecall' | 'redoRegister';

interface Record extends Partial<AdverseAnesthesiaEvent>, Partial<SterilizationRegister>, Partial<SentinelEvent>, Partial<BloodTransfusionReaction>, Partial<SurgicalSiteInfection>, Partial<VerbalOrder>, Partial<OTRecall>, Partial<RedoRegister> {
  type: RecordType;
}

export function useRecords() {
  const [selectedType, setSelectedType] = useState<RecordType>('adverseAnesthesiaEvent');
  const [records, setRecords] = useState<Record[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from(selectedType)
        .select();
      if (error) {
        console.error('Error fetching records:', error);
      } else {
        const recordsWithType = data.map((record: any) => ({
          ...record,
          type: selectedType,
        }));
        setRecords(recordsWithType as Record[]);
      }
    };

    fetchRecords();
  }, [selectedType]);

  const handleAddRecord = async (data: any) => {

    const { data: newRecord, error } = await supabase
      .from(selectedType)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.log(data);
      console.error('Error adding record:', error);
      return;
    }

    setRecords(prev => [...prev, { ...newRecord, type: selectedType }]);
    setIsDialogOpen(false);
  };

  const handleUpdateRecord = async (id: string, data: any) => {
    const { error } = await supabase
      .from(selectedType)
      .update(data)
      .eq('id', id);

    if (error) {
      console.error('Error updating record:', error);
      return;
    }

    setRecords(prev =>
      prev.map(record => record.id?.toString() === id ? { ...record, ...data } : record)
    );
  };

  const handleDeleteRecord = async (id: number) => {
    const { error } = await supabase
      .from(selectedType)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting record:', error);
      return;
    }

    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return {
    selectedType,
    setSelectedType,
    records,
    isDialogOpen,
    setIsDialogOpen,
    handleAddRecord,
    handleUpdateRecord,
    handleDeleteRecord,
  };
}