"use client";

import { useState, useEffect } from "react";
import EditColumn from "./kanban-column-edit";

import Task from "./task";
import CreateTaskModal from "./task-modal";

import { useAuth } from "@clerk/nextjs";
import { getTasks } from "@/app/utils/supabase-request";

export default function KanbanColumn(props: any) {
	const { name } = props;
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
		<div className="rounded-md border w-1/4 h-full overflow-hidden min-w-fit dark:border-zinc-600">
			<header className="bg-slate-50 sticky top-0 z-10">
				<div className="h-12 px-4 text-left align-middle border-b font-medium text-slate-700 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-600 flex items-center justify-between">
					<div className="mr-2">{name}</div>
					<div className="ml-auto flex items-center">
						<CreateTaskModal />
					</div>
					<div className="ml-2 flex items-center">
						<EditColumn />
					</div>
				</div>
			</header>
			<div className="h-full transition-colors hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 overflow-y-auto">
				<div className="flex flex-col gap-4 p-4 align-middle">
					{tasks.map((task) => (
						<Task key={task.id} task={task} />
					))}
				</div>
			</div>
		</div>
	);
}
