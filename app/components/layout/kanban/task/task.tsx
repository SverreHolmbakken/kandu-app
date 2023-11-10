import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import TaskOptions from "./task-options";

export type TaskProps = {
	task: any;
	id?: number;
	title?: string;
	description?: string;
	setTasks?: React.Dispatch<React.SetStateAction<any[]>>;
};
export default function Task({ task, setTasks }: TaskProps) {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.task_id,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
			/>
		);
	}

	return (
		<Card
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="w-full hover:border-2"
		>
			<CardHeader>
				<CardTitle>
					<div className="flex items-center justify-between text-base">
						<div className="flex items-center">
							<div className="mr-2">{task.title}</div>
						</div>
						<div className="ml-2">
							<TaskOptions taskId={task.task_id} setTasks={setTasks} />
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{task.description}</p>
			</CardContent>
		</Card>
	);
}
