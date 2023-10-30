import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
	task: Task;
}

function TaskCard({ task }: Props) {
	const [mouseIsOver, setMouseIsOver] = useState(false);
	const [editMode, setEditMode] = useState(true);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const toggleEditMode = () => {
		setEditMode((prev) => !prev);
		setMouseIsOver(false);
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="opacity-60 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab relative"
			/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={toggleEditMode}
			className="bg-zinc-50 border p-2.5 h-[100px] min-h-[100px] flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-purple-700 cursor-grab relative task dark:bg-zinc-900 dark:border-zinc-600/50"
			onMouseEnter={() => {
				setMouseIsOver(true);
			}}
			onMouseLeave={() => {
				setMouseIsOver(false);
			}}
		>
			<p className="text-black my-auto h-[90%] w-full overflow-x-hidden select-none dark:text-zinc-100">
				{task.content}
			</p>
		</div>
	);
}

export default TaskCard;
