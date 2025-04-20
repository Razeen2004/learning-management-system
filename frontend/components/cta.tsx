'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Start Your Learning Journey Today
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of learners and educators on our platform. Explore courses, track progress, and achieve your goals with our LMS.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
}