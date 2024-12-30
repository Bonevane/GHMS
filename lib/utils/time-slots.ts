import { Appointment } from '@/app/types/index';
import { addMinutes, format, parse, isWithinInterval } from 'date-fns';

// Time slot interval in minutes
export const TIME_SLOT_INTERVAL = 15;

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

// Generate time slots for a given day
export function generateTimeSlots(date: Date, startTime: string, endTime: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let currentTime = parse(startTime, 'HH:mm', date);
  const end = parse(endTime, 'HH:mm', date);

  while (currentTime < end) {
    slots.push({
      startTime: format(currentTime, 'HH:mm'),
      endTime: format(addMinutes(currentTime, TIME_SLOT_INTERVAL), 'HH:mm'),
      available: true
    });
    currentTime = addMinutes(currentTime, TIME_SLOT_INTERVAL);
  }

  return slots;
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