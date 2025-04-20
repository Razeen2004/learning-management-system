import { Inter } from 'next/font/google';
// import './globals.css';
import { ThemeProvider, useTheme } from 'next-themes';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import ThemeChanger from '@/components/theme-changer';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
// import { Header } from '@/components/Header';
// import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LMS Dashboard',
  description: 'Learning Management System Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <main className="p-4 md:p-6 flex-1">
                <SidebarTrigger className="md:hidden mb-4" />
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider> */}
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/dashboard">
                          Dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage></BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className='flex items-center gap-2 px-4'>
                  <ThemeChanger />
                  <Button className='bg-background h-8 w-8 rounded-lg' variant="ghost" size="icon">
                    <Avatar className=''>
                      <AvatarImage src="" alt='username' />
                      <AvatarFallback className="rounded-lg flex items-center justify-center">CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </div>
              </header>
              {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
              </div> */}
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}