"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const recordTypes = [
  { id: 'redo', label: 'Redo Register' },
  { id: 'blood-transfusion', label: 'Blood Transfusion Reaction' },
  { id: 'anesthesia', label: 'Adverse Anesthesia Events' },
  { id: 'infection', label: 'Surgical Site Infection' },
  { id: 'verbal-order', label: 'Verbal Order' },
  { id: 'ot-recall', label: 'OT Recall' },
  { id: 'sterilization', label: 'Sterilization' },
];

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medical Records</h2>
        <p className="text-muted-foreground">
          Manage and view detailed medical records
        </p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {recordTypes.map((type) => (
          <Link
            key={type.id}
            href={`/dashboard/records/${type.id}`}
            className="whitespace-nowrap px-4 py-2 rounded-md hover:bg-accent"
          >
            {type.label}
          </Link>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}