import { useMemo, useState } from "react";
import ColumnContainer from "./demo-column";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./demo-task";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hand, Move } from "lucide-react";

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

const defaultCols: Column[] = [
	{
		id: "todo",
		title: "Todo",
	},
	{
		id: "review",
		title: "In review",
	},
	{
		id: "ongoing",
		title: "On going",
	},
	{
		id: "completed",
		title: "Completed",
	},
];

const defaultTasks: Task[] = [
	{
		id: "1",
		columnId: "todo",
		content: "Search for new positions",
	},
	{
		id: "2",
		columnId: "review",
		content: "Update my resume and cover letter to match the job description",
	},
	{
		id: "3",
		columnId: "ongoing",
		content: "Apply to jobs",
	},
	{
		id: "4",
		columnId: "review",
		content: "Interview",
	},
	{
		id: "5",
		columnId: "completed",
		content: "Research the company",
	},
	{
		id: "6",
		columnId: "todo",
		content: "Get a job",
	},
	{
		id: "7",
		columnId: "completed",
		content: "Learn new frameworks",
	},
	{
		id: "8",
		columnId: "todo",
		content: "Kill the impostor-syndrome",
	},
	{
		id: "9",
		columnId: "completed",
		content: "Get ghosted by recruiters",
	},
	{
		id: "10",
		columnId: "ongoing",
		content: "Get ghosted by recruiters again",
	},
	{
		id: "11",
		columnId: "todo",
		content: "Fight the crippling depression",
	},
	{
		id: "12",
		columnId: "review",
		content: "Call the therapist",
	},
	{
		id: "13",
		columnId: "ongoing",
		content: "Follow up with recruiters",
	},
];

function Demo() {
	const [columns, setColumns] = useState<Column[]>(defaultCols);
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

	const [tasks, setTasks] = useState<Task[]>(defaultTasks);

	const [activeColumn, setActiveColumn] = useState<Column | null>(null);

	const [activeTask, setActiveTask] = useState<Task | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	const [ref, inView] = useInView({
		threshold: 1,
		triggerOnce: true,
	});

	const variants = {
		visible: { opacity: 1, scale: 1 },
		hidden: { opacity: 0, scale: 0.65 },
	};

	return (
		<motion.section
			className="grid h-screen"
			animate={inView ? "visible" : "hidden"}
			variants={variants}
			exit="hidden"
			transition={{ duration: 0.5 }}
			ref={ref}
		>
			<div className="justify-self-end text-right mr-20 mt-20">
				<span className="text-4xl font-bold ">
					Organize and plan your project with your team
				</span>
				<p className="text-l text-zinc-700">
					Create tasks and drag them across your board as you progress.
				</p>
			</div>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<SortableContext items={columnsId}>
					<div className="flex flex-row justify-self-center p-5 space-x-5 w-[85vw] h-[60vh] border shadow-xl rounded-xl bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-700/10 dark:bg-zinc-900 dark:border-zinc-900/50 dark:shadow-2xl">
						{columns.map((col) => (
							<ColumnContainer
								key={col.id}
								column={col}
								tasks={tasks.filter((task) => task.columnId === col.id)}
							/>
						))}
					</div>
				</SortableContext>

				{createPortal(
					<DragOverlay>
						{activeColumn && (
							<ColumnContainer
								column={activeColumn}
								tasks={tasks.filter(
									(task) => task.columnId === activeColumn.id
								)}
							/>
						)}
						{activeTask && <TaskCard task={activeTask} />}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
			<p className="flex justify-center opacity-60">
				Grab &nbsp;
				<Hand />
				&nbsp;columns and tasks to move them around &nbsp;
				<Move />
			</p>
		</motion.section>
	);

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === "Column") {
			setActiveColumn(event.active.data.current.column);
			return;
		}

		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveAColumn = active.data.current?.type === "Column";
		if (!isActiveAColumn) return;

		console.log("DRAG END");

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(col) => col.id === activeId
			);

			const overColumnIndex = columns.findIndex((col) => col.id === overId);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === "Task";
		const isOverATask = over.data.current?.type === "Task";

		if (!isActiveATask) return;

		// Im dropping a Task over another Task
		if (isActiveATask && isOverATask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const overIndex = tasks.findIndex((t) => t.id === overId);

				if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
					// Fix introduced after video recording
					tasks[activeIndex].columnId = tasks[overIndex].columnId;
					return arrayMove(tasks, activeIndex, overIndex - 1);
				}

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === "Column";

		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);

				tasks[activeIndex].columnId = overId;
				console.log("DROPPING TASK OVER COLUMN", { activeIndex });
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	}
}

export default Demo;
