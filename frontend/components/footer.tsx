'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background py-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">About LMS</h3>
            <p className="text-muted-foreground leading-relaxed">
              Empowering learners, educators, and professionals with cutting-edge courses and intuitive tools to drive success in education.
            </p>
          </div>
          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Contact Us</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <a href="mailto:support@lms.com" className="hover:text-primary transition-colors">
                Email: support@lms.com
              </a>
              <br />
              <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                Phone: (123) 456-7890
              </a>
            </p>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <a href="https://facebook.com">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <a href="https://twitter.com">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <a href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-muted/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}