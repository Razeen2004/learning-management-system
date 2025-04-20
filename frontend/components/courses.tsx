'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Courses() {
  const courses = [
    {
      title: 'Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, and React in this comprehensive course for beginners and intermediates.',
      link: '/courses/web-development',
    },
    {
      title: 'Data Science Essentials',
      description: 'Learn Python, data analysis, and machine learning techniques to kickstart your data science career.',
      link: '/courses/data-science',
    },
    {
      title: 'Graphic Design Fundamentals',
      description: 'Explore design principles, Adobe tools, and creative workflows to create stunning visuals.',
      link: '/courses/graphic-design',
    },
    {
      title: 'Project Management Pro',
      description: 'Gain skills in Agile, Scrum, and leadership to manage projects effectively.',
      link: '/courses/project-management',
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Discover Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="shadow-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <Button asChild className="w-full">
                  <Link href={course.link}>Enroll Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}