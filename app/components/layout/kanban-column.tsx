"use client";

import { useState, useEffect } from "react";
import EditColumn from "./kanban-column-edit";

import {
	Table,
	Table80,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import Task from "./task";
import CreateTaskModal from "./task-modal";

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
		<div className="rounded-md border w-1/5 h-full edit-this-div min-w-fit">
			{/* Invisible div here */}
			<Table80 className="h-full">
				<TableHeader>
					<TableRow className="bg-white">
						<TableHead>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="mr-2">Column name</div>
								</div>
								<div className="ml-auto flex items-center">
									<CreateTaskModal />
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
						<TableCell className="flex flex-col gap-2 h-full">
							{tasks.map((task) => (
								<Task key={task.id} task={task} />
							))}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table80>
		</div>
	);
}
