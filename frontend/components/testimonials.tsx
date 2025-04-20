'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      content: 'This LMS transformed my learning experience. The courses are engaging, and the platform is easy to use!',
      avatar: 'https://avatar.iran.liara.run/public/1',
    },
    {
      name: 'Michael Chen',
      role: 'Teacher',
      content: 'Creating and managing courses is seamless. My students love the interactive content.',
      avatar: 'https://avatar.iran.liara.run/public/2',
    },
    {
      name: 'Emily Davis',
      role: 'Professional',
      content: 'The flexible learning paths helped me upskill while balancing my job. Highly recommend!',
      avatar: 'https://avatar.iran.liara.run/public/3',
    },
    {
      name: 'James Wilson',
      role: 'Student',
      content: 'The course materials are top-notch, and the support team is always helpful.',
      avatar: 'https://avatar.iran.liara.run/public/4',
    },
    {
      name: 'Laura Martinez',
      role: 'Teacher',
      content: 'I love how easy it is to track student progress and provide feedback.',
      avatar: 'https://avatar.iran.liara.run/public/5',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          What Our Users Say
        </h2>
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_33.33%] px-2"
                >
                  <Card className="shadow-md h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name} avatar`}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}