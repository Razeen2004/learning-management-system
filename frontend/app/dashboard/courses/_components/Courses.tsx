'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    tags: string[];
}

interface CoursesProps {
    courses?: Course[]; // Optional prop to pass custom courses
}

const defaultCourses: Course[] = [
    {
        id: '1',
        title: 'Introduction to Python',
        description: 'Learn the basics of Python programming, including syntax, data structures, and more.',
        price: '$49.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Beginner', 'Programming', 'Python']
    },
    {
        id: '2',
        title: 'Web Development Bootcamp',
        description: 'Master HTML, CSS, JavaScript, and React to build modern web applications.',
        price: '$99.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Intermediate', 'Web Development', 'React']
    },
    {
        id: '3',
        title: 'Database Fundamentals',
        description: 'Understand SQL, NoSQL, and database design principles for data management.',
        price: 'Free',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Beginner', 'Database', 'SQL']
    },
    {
        id: '4',
        title: 'Advanced Machine Learning',
        description: 'Dive into machine learning algorithms, neural networks, and AI applications.',
        price: '$149.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Advanced', 'Machine Learning', 'AI']
    },
    {
        id: '5',
        title: 'Introduction to Python',
        description: 'Learn the basics of Python programming, including syntax, data structures, and more.',
        price: '$49.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Beginner', 'Programming', 'Python']
    },
    {
        id: '6',
        title: 'Web Development Bootcamp',
        description: 'Master HTML, CSS, JavaScript, and React to build modern web applications.',
        price: '$99.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Intermediate', 'Web Development', 'React']
    },
    {
        id: '7',
        title: 'Database Fundamentals',
        description: 'Understand SQL, NoSQL, and database design principles for data management.',
        price: 'Free',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Beginner', 'Database', 'SQL']
    },
    {
        id: '8',
        title: 'Advanced Machine Learning',
        description: 'Dive into machine learning algorithms, neural networks, and AI applications.',
        price: '$149.99',
        image: 'https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Advanced', 'Machine Learning', 'AI']
    }
];

export function CourseCard({ course }: { course: Course }) {
    const { resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const badgeVariant = isMounted && resolvedTheme === 'dark' ? 'secondary' : 'default';
    const iconColorClass = isMounted ? (resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900') : 'text-gray-900';

    return (
        <Card className="flex flex-col h-full pt-0 overflow-hidden">
            <div className="relative w-full h-40 mb-0">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>
            <CardHeader className='px-4'>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                        <Badge key={tag} variant={badgeVariant}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="flex-grow px-4">
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                <p className="mt-2 text-lg font-bold text-foreground">{course.price}</p>
            </CardContent>
            <CardFooter className='px-4'>
                <Button asChild className="w-full">
                    <Link href={`/courses/${course.id}/enroll`}>Enroll Now</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function Courses({ courses = defaultCourses }: CoursesProps) {
    return (
        <div className="">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {courses.slice(0, 8).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}