"use client";

import { useState, useEffect } from "react";
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

import { useAuth } from "@clerk/nextjs";
import { getTasks } from "@/app/utils/supabase-request";

export default function KanbanColumn() {
	const { userId, getToken } = useAuth();
	const [tasks, setTasks] = useState<Task[]>([]);

	interface Task {
		id: number;
		title: string;
		description: string;
	}

	useEffect(() => {
		const loadTasks = async () => {
			const token = await getToken({ template: "supabase" });
			const tasks = await getTasks({
				userId: userId ?? "",
				token: token ?? "",
			});
			setTasks(tasks || []);
		};
		loadTasks();
	}, []);
	console.log(tasks);

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
						<TableCell className="flex flex-col gap-2">
							{tasks.map((task) => (
								<Task key={task.id} task={task} />
							))}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
