"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TimeSlot } from '@/lib/utils/time-slots';
import { cn } from '@/lib/utils';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSelectSlot: (startTime: string) => void;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) {
  return (
    <ScrollArea className="h-[300px] rounded-md border p-4">
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <Button
            key={slot.startTime}
            variant="outline"
            className={cn(
              "w-full",
              selectedSlot === slot.startTime && "border-primary bg-primary/10",
              !slot.available && "opacity-50 cursor-not-allowed"
            )}
            disabled={!slot.available}
            onClick={() => onSelectSlot(slot.startTime)}
          >
            {slot.startTime}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}