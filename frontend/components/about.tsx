'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function About() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Empowering Education with Our LMS
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Our Learning Management System is designed to connect learners, educators, and professionals. With a focus on accessibility and innovation, we provide tools and courses to help you achieve your educational goals, whether you're a student, teacher, or administrator.
        </p>
        <Button size="lg" asChild>
          <Link href="/about">Discover Our Mission</Link>
        </Button>
      </div>
    </section>
  );
}