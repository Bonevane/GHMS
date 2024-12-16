import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Hospital } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <Hospital className="h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hospital Management System
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A comprehensive solution for managing hospital operations, patient records,
            and healthcare services efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/login">
              <Button size="lg">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Appointment Management',
    description: 'Efficiently schedule and manage patient appointments with an intuitive calendar interface.',
    icon: Hospital,
  },
  {
    title: 'Patient Records',
    description: 'Securely store and access patient medical records, history, and treatment plans.',
    icon: Hospital,
  },
  {
    title: 'Analytics & Reports',
    description: 'Generate comprehensive reports and analyze hospital performance metrics.',
    icon: Hospital,
  },
];