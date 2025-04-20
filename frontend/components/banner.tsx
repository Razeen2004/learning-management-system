'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Banner() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Learn Smarter, Achieve More
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover a wide range of courses designed to empower students, teachers, and professionals. Start your learning journey today with our expert-led programs.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="hidden md:block">
            <div className="bg-primary/20 rounded-lg h-64 w-full flex items-center justify-center">
              <span className="text-muted-foreground">Course Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}