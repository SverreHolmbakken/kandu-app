"use client";

import { useState, useEffect, FC } from "react";
import { useAuth } from "@clerk/nextjs";
import { getTasksByColumnId } from "@/app/utils/supabase-request";
import CreateTaskModal from "../task/modal-task";
import EditColumn from "./edit-column";
import Task from "../task/task";
import EditableText from "@/app/utils/editable-text";
import { TaskType, KanbanColumnProps } from "@/Types";

const KanbanColumn: FC<KanbanColumnProps> = ({
	name,
	columnId,
	setColumns,
}) => {
	const { userId, getToken } = useAuth();
	const [tasks, setTasks] = useState<TaskType[]>([]);

	useEffect(() => {
		const loadTasks = async () => {
			const token = await getToken({ template: "supabase" });
			const fetchedTasks = await getTasksByColumnId({
				userId: userId ?? "",
				token: token ?? "",
				columnId: columnId,
			});
			setTasks(fetchedTasks || []);
		};
		loadTasks();
	}, []);

	console.log(tasks, "tasks");

	return (
		<div className="rounded-md border w-1/4 min-w-[350px] h-full overflow-hidden dark:border-zinc-600">
			<header className="bg-slate-50 sticky top-0 z-10">
				<div className="h-12 px-4 text-left align-middle border-b font-medium text-slate-700 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-600 flex items-center justify-between">
					<div className="mr-2">
						<EditableText
							initialText={name}
							columnId={columnId}
							name={name}
						/>
					</div>
					<div className="ml-auto flex items-center">
						<CreateTaskModal
							columnId={columnId}
							tasks={tasks}
							setTasks={setTasks}
						/>
					</div>
					<div className="ml-2 flex items-center">
						<EditColumn columnId={columnId} setColumns={setColumns} />
					</div>
				</div>
			</header>
			<div className="h-full transition-colors hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 overflow-y-auto">
				<div className="flex flex-col gap-4 p-4 align-middle">
					{tasks.map((task) => (
						<Task key={task.task_id} task={task} />
					))}
				</div>
			</div>
		</div>
	);
};

export default KanbanColumn;
