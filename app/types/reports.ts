export interface LabReport {
  id: string;
  mr: string;
  date: Date;
  referredBy: string;
  testName: string;
  labName: string;
  criticalResult: boolean;
  informTo: string;
}

export interface RadiologyReport {
  id: string;
  date: Date;
  mr: string;
  referredBy: string;
  radiologyTestName: string;
  labName: string;
  timeIn: Date;
  timeOut: Date;
}