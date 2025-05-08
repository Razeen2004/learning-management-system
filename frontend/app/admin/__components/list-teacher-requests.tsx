"use client";

import * as React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type TeacherRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  education: string;
  subjects: string;
  experience: string;
  jobTitle: string;
  linkedin: string;
  resume: string;
  certifications: string;
  status: string;
};

type TeacherRequestsTableProps = {
  requests: TeacherRequest[];
};

export function TeacherRequestsTable({ requests }: TeacherRequestsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");
  const [selectedRequest, setSelectedRequest] = React.useState<TeacherRequest | null>(null);

  const columns: ColumnDef<TeacherRequest>[] = [
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: requests,
    columns,
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by email..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No teacher requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Sheet for full details */}
      <Sheet open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <SheetContent side="right" className="w-full max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Teacher Application Details</SheetTitle>
          </SheetHeader>
          {selectedRequest && (
            <div className="p-6 space-y-6 text-sm text-gray-800 dark:text-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Detail label="Full Name" value={selectedRequest.fullName} />
                <Detail label="Email" value={selectedRequest.email} />
                <Detail label="Phone" value={selectedRequest.phone} />
                <Detail label="Job Title" value={selectedRequest.jobTitle} />
                <Detail label="Experience" value={selectedRequest.experience} />
                <Detail label="Education" value={selectedRequest.education} />
                <Detail label="Subjects" value={selectedRequest.subjects} />
                <Detail label="LinkedIn">
                  <Button asChild>
                    <a
                      href={selectedRequest.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View LinkedIn
                    </a>
                  </Button>
                </Detail>
                <Detail label="Resume">
                  <Button asChild>
                    <a
                      href={selectedRequest.resume || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </Button>
                </Detail>
                <Detail label="Certifications">
                  <Button asChild>
                    <a
                      href={selectedRequest.certifications || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certifications
                    </a>
                  </Button>
                </Detail>
                <Detail label="Status" value={selectedRequest.status} />
              </div>

              <div>
                <h4 className="font-medium text-base mb-2">Bio</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedRequest.bio}</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="destructive" onClick={() => console.log("Reject", selectedRequest.id)}>
                  Reject
                </Button>
                <Button onClick={() => console.log("Approve", selectedRequest.id)}>
                  Approve
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

const Detail = ({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) => (
  <div className="space-y-1">
    <div className="text-muted-foreground text-xs uppercase tracking-wide">{label}</div>
    <div>{children ?? value}</div>
  </div>
);