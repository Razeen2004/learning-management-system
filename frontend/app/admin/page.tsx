"use client"
import { BookOpen, CheckCircle, Clipboard, Percent, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"

export default function StudentOverviewPage() {
  const { data: session, status } = useSession();

  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    if (status === "unauthenticated") {
      signIn(); // Redirects to login
    }
  }, [status]);

  // Mock student analytics data
  const analytics = {
    enrolledCourses: 5,
    completedCourses: 2,
    averageGrade: 85,
    pendingAssignments: 3,
  };
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#e76e50",
    },
    mobile: {
      label: "Mobile",
      color: "#2a9d90",
    },
  } satisfies ChartConfig

  // Theme-aware colors
  const iconColorClass = isMounted ? (resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900') : 'text-gray-900';
  const chartStrokeColor = resolvedTheme === 'dark' ? '#ffffff' : '#1f2937';

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Admin Overview</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className={`h-4 w-4 ${iconColorClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.enrolledCourses}</div>
            <CardDescription>Active courses you&apos;re taking</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <CheckCircle className={`h-4 w-4 ${iconColorClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedCourses}</div>
            <CardDescription>Courses fully completed</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Percent className={`h-4 w-4 ${iconColorClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageGrade}%</div>
            <CardDescription>Across all courses</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <Clipboard className={`h-4 w-4 ${iconColorClass}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pendingAssignments}</div>
            <CardDescription>Assignments due soon</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Progress Graph */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>
              Showing total time learning for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <div></div>
      </div>
    </div>
  );
}