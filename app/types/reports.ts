export interface LabReport {
  id: string;
  mr: string;
  date: Date;
  referredby: string;
  testname: string;
  labname: string;
  criticalresult: boolean;
  informto: string;
}

export interface RadiologyReport {
  id: string;
  date: Date;
  mr: string;
  referredby: string;
  radiologytestname: string;
  labname: string;
  timein: String;
  timeout: String;
}