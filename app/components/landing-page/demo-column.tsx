import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./demo-task";
import { Separator } from "../ui/separator";

export type Id = string | number;

export type Column = {
	id: Id;
	title: string;
};

export type Task = {
	id: Id;
	columnId: Id;
	content: string;
};
interface Props {
	column: Column;
	tasks: Task[];
}

function ColumnContainer({ column, tasks }: Props) {
	const [editMode, setEditMode] = useState(false);

	const tasksIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	if (isDragging) {
		return (
			<div
				className="h-full w-full border rounded-lg p-4 bg-gray-100 dark:bg-zinc-900 dark:border-zinc-900/50 dark:shadow-2xl"
				ref={setNodeRef}
				style={style}
			></div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="h-full w-full border rounded-lg p-4 overflow-y-scroll bg-white dark:bg-zinc-900 dark:border-zinc-900/50 dark:shadow-2xl"
		>
			{/* Column title */}
			<div className="" {...attributes} {...listeners}>
				<div>{column.title}</div>
			</div>
			<Separator className="my-2" />
			{/* Column task container */}
			<div className="space-y-5">
				<SortableContext items={tasksIds}>
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</SortableContext>
			</div>
		</div>
	);
}

export default ColumnContainer;
