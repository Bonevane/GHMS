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
      <div className="border rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}