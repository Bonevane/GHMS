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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          View and manage medical reports
        </p>
      </div>

      <div className="flex space-x-4">
        {reportTypes.map((type) => (
          <Link
            key={type.id}
            href={`/dashboard/reports/${type.id}`}
            className="px-4 py-2 rounded-md hover:bg-accent"
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