"use client"

import Link from "next/link"

const reportTypes = [
  { id: 'radiology', label: 'Radiology Reports' },
  { id: 'laboratory', label: 'Laboratory Reports' },
];

export default function ReportsLayout({
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