"use client";

import { useState, useEffect, FC, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { getTasksByColumnId } from "@/app/utils/supabase-request";
import EditableText from "@/app/utils/editable-text";

import CreateTaskModal from "../task/modal-task";
import EditColumn from "./edit-column";
import Task from "../task/task";
import { TaskType, KanbanColumnProps } from "@/Types";

import { Grip } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragOverlay } from "@dnd-kit/core";

function KanbanColumn({ name, columnId, setColumns }: KanbanColumnProps) {
	const { userId, getToken } = useAuth();
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [text, setText] = useState(name);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: columnId,
		data: {
			type: "Column",
			columnId,
		},
	});

	const tasksIds = useMemo(() => tasks.map((task) => task.task_id), [tasks]);

	const style = { transform: CSS.Transform.toString(transform), transition };

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
	}, [columnId]); // Add columnId to the dependency array

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="rounded-md border-2 w-1/4 min-w-[350px] h-full overflow-hidden opacity-60 cursor-grabbing dark:border-zinc-600"
			/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="rounded-md border w-1/4 min-w-[350px] h-full overflow-hidden dark:border-zinc-600"
		>
			<header className="bg-slate-50 sticky top-0 z-10">
				<div className="h-12 px-4 text-left align-middle border-b font-medium text-slate-700 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-600 flex items-center justify-between">
					<div {...listeners} {...attributes}>
						<Grip className="opacity-50 mr-2 cursor-grab" />
					</div>
					<div className="mr-2">
						<EditableText
							columnId={columnId}
							setText={setText}
							text={text}
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
						<EditColumn
							columnId={columnId}
							setColumns={setColumns}
							setText={setText}
							text={text}
						/>
					</div>
				</div>
			</header>
			<div className="h-full transition-colors hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 overflow-y-auto">
				<div className="flex flex-col gap-4 p-4 align-middle">
					<SortableContext items={tasksIds}>
						{tasks.map((task) => (
							<Task key={task.task_id} task={task} setTasks={setTasks} />
						))}
					</SortableContext>
				</div>
			</div>
		</div>
	);
}

export default KanbanColumn;
