"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { AdverseAnesthesiaForm } from './forms/adverse-anesthesia-form';
import { BloodTransfusionForm } from './forms/blood-transfusion-form';
import { SurgicalSiteForm } from './forms/surgical-site-form';
import { VerbalOrderForm } from './forms/verbal-order-form';
import { OTRecallForm } from './forms/ot-recall-form';
import { RedoForm } from './forms/redo-form';
import { SterilizationForm } from './forms/sterilization-form';
import { SentinelEventForm } from './forms/sentinel-event-form';
interface RecordFormProps {

  type: 'adverseAnesthesiaEvent' | 'sterilizationRegister' | 'sentinelEvent' | 'bloodTransfusionReaction' | 'surgicalSiteInfection' | 'verbalOrder' | 'otRecall' | 'redoRegister';

  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function RecordForm({ type, onSubmit, onCancel }: RecordFormProps) {
  const getFormComponent = () => {
    switch (type) {
      case 'adverseAnesthesiaEvent':
        return <AdverseAnesthesiaForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'bloodTransfusionReaction':
        return <BloodTransfusionForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'surgicalSiteInfection':
        return <SurgicalSiteForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'verbalOrder':
        return <VerbalOrderForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'otRecall':
        return <OTRecallForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'redoRegister':
        return <RedoForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'sterilizationRegister':
        return <SterilizationForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'sentinelEvent':
        return <SentinelEventForm onSubmit={onSubmit} onCancel={onCancel} />;
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