"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { AdverseAnesthesiaForm } from './forms/adverse-anesthesia-form';
import { BloodTransfusionForm } from './forms/blood-transfusion-form';
import { SurgicalSiteForm } from './forms/surgical-site-form';
import { VerbalOrderForm } from './forms/verbal-order-form';
import { OTRecallForm } from './forms/ot-recall-form';
import { RedoForm } from './forms/redo-form';
import { SterilizationForm } from './forms/sterilization-form';

interface RecordFormProps {
  type: 'adverse-anesthesia' | 'blood-transfusion' | 'surgical-site' | 'verbal-order' | 'ot-recall' 
  | 'redo' | 'sterilization';
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function RecordForm({ type, onSubmit, onCancel }: RecordFormProps) {
  const getFormComponent = () => {
    switch (type) {
      case 'adverse-anesthesia':
        return <AdverseAnesthesiaForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'blood-transfusion':
        return <BloodTransfusionForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'surgical-site':
        return <SurgicalSiteForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'verbal-order':
        return <VerbalOrderForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'ot-recall':
        return <OTRecallForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'redo':
        return <RedoForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'sterilization':
        return <SterilizationForm onSubmit={onSubmit} onCancel={onCancel} />;
      default:
        return <div>Form not found for type: {type}</div>;
    }
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
      {getFormComponent()}
    </ScrollArea>
  );
}