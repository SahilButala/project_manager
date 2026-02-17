"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface DataTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTable<TData, TValue>) {
  const [sorting, setsorting] = React.useState<SortingState>([]);
  const [columnFilter, setColumnFilter] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnvisibility, setcolumnvisibility] =
    React.useState<VisibilityState>({});

  const [rowselection, setrowselection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setsorting,
    onColumnFiltersChange: setColumnFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setcolumnvisibility,

    onRowSelectionChange: setrowselection,
    state: {
      sorting,
      columnFilters: columnFilter,
      columnVisibility: columnvisibility,
      rowSelection: rowselection,
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex justify-between items-center p-3">
        <Input
          placeholder="Filter the task title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table?.getColumn("title")?.setFilterValue(e.target.value as string)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((columns) => columns.getCanHide())
              .map((col) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={col?.id}
                    className="capitalize"
                    checked={col?.getIsVisible()}
                    onCheckedChange={(value) => col?.toggleVisibility(!!value)}
                  >
                    {col?.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4 px-5">
        <div className="flex-1 text-sm text-muted-foreground">
          {table?.getFilteredSelectedRowModel()?.rows?.length} of {" "}
          {table?.getFilteredRowModel().rows?.length} row(s) selected
        </div>

        <div className="space-x-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table?.nextPage()}
            disabled={!table?.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
