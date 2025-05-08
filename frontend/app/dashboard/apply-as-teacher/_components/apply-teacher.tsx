"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function TeacherRequestForm() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const badgeVariant = isMounted && resolvedTheme === "dark" ? "secondary" : "default";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    education: "",
    subjects: "",
    experience: "",
    jobTitle: "",
    linkedin: "",
    resume: null as File | null,
    certifications: null as File | null,
    agree: false,
    confirm: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setForm({ ...form, [name]: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree || !form.confirm) {
      alert("Please agree to the terms and confirm.");
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    try {
      await fetch("/api/teacher-request", {
        method: "POST",
        body: formData,
      });
      alert("Your request has been submitted!");
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="flex flex-col w-full max-w-3xl h-full overflow-hidden">
        <CardHeader className="px-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Teacher Application Form
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Full Name</Label>
                <Input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="text-foreground"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="text-foreground"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Phone Number</Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  className="text-foreground"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Current Job Title</Label>
                <Input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className="text-foreground"
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            {/* Education and Teaching */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Education Level</Label>
                <Input
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="text-foreground"
                  placeholder="e.g., Bachelor's in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Subjects to Teach</Label>
                <Input
                  name="subjects"
                  value={form.subjects}
                  onChange={handleChange}
                  className="text-foreground"
                  placeholder="e.g., JavaScript, Python"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Years of Experience</Label>
                <Input
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  type="number"
                  min={0}
                  className="text-foreground"
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">LinkedIn Profile</Label>
                <Input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  type="url"
                  className="text-foreground"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Short Bio</Label>
              <Textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                className="text-foreground"
                placeholder="Tell us about yourself and your teaching philosophy..."
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Upload Resume / CV</Label>
                <Input
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Upload Certifications</Label>
                <Input
                  name="certifications"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileChange}
                  className="text-foreground"
                />
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={form.agree}
                  onCheckedChange={(v) => setForm({ ...form, agree: !!v })}
                  className={cn(badgeVariant === "secondary" ? "border-white" : "border-gray-300")}
                />
                <Label className="text-sm text-foreground">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-foreground underline hover:text-muted-foreground"
                  >
                    terms and conditions
                  </a>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={form.confirm}
                  onCheckedChange={(v) => setForm({ ...form, confirm: !!v })}
                  className={cn(badgeVariant === "secondary" ? "border-white" : "border-gray-300")}
                />
                <Label className="text-sm text-foreground">
                  I confirm all information provided is accurate
                </Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="px-4">
          <Button
            type="submit"
            disabled={submitting}
            variant={badgeVariant}
            className="w-full"
            onClick={handleSubmit}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}