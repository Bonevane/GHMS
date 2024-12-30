import { addMinutes, format, parse, isWithinInterval } from 'date-fns';

// Time slot interval in minutes
export const TIME_SLOT_INTERVAL = 15;

// Generate time slots for a given day
export function generateTimeSlots(date: Date, availability: DoctorAvailability): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const { shifts } = availability;

  shifts.forEach(shift => {
    let currentTime = parse(shift.startTime, 'HH:mm', date);
    const endTime = parse(shift.endTime, 'HH:mm', date);

    while (currentTime < endTime) {
      slots.push({
        startTime: format(currentTime, 'HH:mm'),
        endTime: format(addMinutes(currentTime, TIME_SLOT_INTERVAL), 'HH:mm'),
        available: true
      });
      currentTime = addMinutes(currentTime, TIME_SLOT_INTERVAL);
    }
  });

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

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface DoctorAvailability {
  doctorId: string;
  shifts: {
    startTime: string;
    endTime: string;
  }[];
}