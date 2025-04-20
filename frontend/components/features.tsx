'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BarChart, Shield } from 'lucide-react';

export function Features() {
  const features = [
    {
      title: 'Explore Courses',
      description: 'Access a diverse range of expert-led courses tailored for students and professionals.',
      icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Teacher Tools',
      description: 'Empower educators with intuitive tools for course creation, student management, and feedback.',
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress reports and analytics.',
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Secure Platform',
      description: 'Learn with confidence on a secure, scalable platform designed for all users.',
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Why Choose Our LMS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}