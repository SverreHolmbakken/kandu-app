import React from "react";
import { PlusSquare } from "lucide-react";
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
import TaskModal from "./task-modal";

export default function KanbanColumn() {
	return (
		<div className="rounded-md border w-1/4">
			<Table>
				<TableHeader>
					<TableRow className="bg-white">
						<TableHead>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="mr-2">Column name</div>
								</div>
								<div className="ml-auto">
									<TaskModal />
								</div>
								<div className="ml-2 flex items-center">
									<EditColumn />
								</div>
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="bg-slate-200">
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
