"use client"

import { useState } from 'react';
import { WaitingListTable } from '@/components/waiting-list/waiting-list-table';
import { WaitingListForm } from '@/components/waiting-list/waiting-list-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface WaitingListEntry {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  timestamp: Date;
}

export default function WaitingListPage() {
  const [entries, setEntries] = useState<WaitingListEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WaitingListEntry | null>(null);

  const handleAddEntry = (entry: Omit<WaitingListEntry, 'id' | 'timestamp'>) => {
    const newEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setEntries(prev => [...prev, newEntry]);
    setIsDialogOpen(false);
  };

  const handleEditEntry = (id: string, updatedEntry: Partial<WaitingListEntry>) => {
    setEntries(prev =>
      prev.map(entry => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
    setSelectedEntry(null);
    setIsDialogOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Waiting List</h2>
          <p className="text-muted-foreground">
            Manage patient waiting list
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to Waiting List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEntry ? 'Edit Entry' : 'Add to Waiting List'}
              </DialogTitle>
            </DialogHeader>
            <WaitingListForm
              entry={selectedEntry}
              onSubmit={selectedEntry 
                ? (data) => handleEditEntry(selectedEntry.id, data)
                : handleAddEntry
              }
              onCancel={() => {
                setSelectedEntry(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <WaitingListTable
        entries={entries}
        onEdit={(entry) => {
          setSelectedEntry(entry);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}