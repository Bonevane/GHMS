import { DoctorAvailability } from './time-slots';

export async function getDoctorAvailability(doctorId: string, date: Date): Promise<DoctorAvailability> {
  // This would typically fetch from your database
  // For now, returning mock data
  return {
    doctorId,
    shifts: [
      { startTime: '09:00', endTime: '13:00' },
      { startTime: '14:00', endTime: '17:00' }
    ]
  };
}