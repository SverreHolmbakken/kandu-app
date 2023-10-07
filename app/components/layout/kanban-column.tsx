import React from "react";
import { MoreHorizontal, PlusSquare } from "lucide-react";
import EditColumn from "./kanban-column-edit";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Task from "./task";

export default function KanbanColumn() {
  return (
    <div className="rounded-md border w-1/4">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2">Column name</div>
                </div>
                <div className="ml-auto">
                  <PlusSquare />
                </div>
                <div className="ml-2">
                  <EditColumn />
                </div>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Task />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
