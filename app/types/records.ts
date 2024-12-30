// Record Types
export interface AdverseAnesthesiaEvent {
  id: number;
  date: Date;
  mr: string;
  typeOfAnesthesia: string;
  detailOfEvent: string;
  analysis: string;
  correctiveAction: string;
}

export interface SterilizationRegister {
  id: number;
  batch: string;
  date: Date;
  expiryDate: Date;
  pack: string;
  issueDate: Date;
  mr: string;
  procedure: string;
  surgeon: string;
  stereotapeGaugeColorChange: string;
}

export interface SentinelEvent {
  id: number;
  date: Date;
  eventSummary: string;
  personFactor: string;
  actionToken: string;
  preventiveMeasure: string;
  remarks: string;
}

export interface BloodTransfusionReaction {
  id: number;
  date: Date;
  mr: string;
  diagnosis: string;
  bloodGroupDonor: string;
  bloodGroupOnVerifyRecipient: string;
  bloodGroupOnVerifyDonor: string;
  transfusionReactionType: string;
  possibleReaction: string;
  remarks: string;
}

export interface SurgicalSiteInfection {
  id: number;
  date: Date;
  mr: string;
  doctorName: string;
  procedure: string;
  ot: string;
  remarks: string;
}

export interface VerbalOrder {
  id: number;
  date: Date;
  mr: string;
  doctorName: string;
  medicineOrderVerbally: string;
  staffName: string;
}

export interface OTRecall {
  id: number;
  date: Date;
  batch: string;
  items: string;
  whereTo: string;
  expiryDate: Date;
  sterilizationValidationTests: string;
  personResponsible: string;
  recallNotes: string;
}

export interface RedoRegister {
  id: number;
  date: Date;
  mr: string;
  errorsInResult: string;
  testRedo: string;
  reportNotCorelating: string;
  precautionsNotFollowed: string;
  remarks: string;
}