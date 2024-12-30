import { Appointment } from '@/app/types';
import { TimeSlot } from './time-slots';
import { isWithinInterval, parse } from 'date-fns';

export function getAvailableTimeSlots(
  slots: TimeSlot[],
  appointments: Appointment[],
  date: Date
): TimeSlot[] {
  return slots.map(slot => ({
    ...slot,
    available: isTimeSlotAvailable(slot, appointments, date)
  }));
}

export function isTimeSlotAvailable(
  slot: TimeSlot,
  appointments: Appointment[],
  date: Date
): boolean {
  const slotStart = parse(slot.startTime, 'HH:mm', date);
  const slotEnd = parse(slot.endTime, 'HH:mm', date);

  return !appointments.some(appointment => {
    const appointmentTime = new Date(appointment.date);
    return isWithinInterval(appointmentTime, { start: slotStart, end: slotEnd });
  });
}