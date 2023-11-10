"use client";

import KanbanColumn from "@/app/components/layout/kanban/column/column";
import ProjectNav from "@/app/components/layout/kanban/project/project-nav";
import NewColumn from "@/app/components/layout/kanban/column/new-column";
import Task from "@/app/components/layout/kanban/task/task";
import { Skeleton } from "@/app/components/ui/skeleton";

import { FC, useEffect, useMemo, useState } from "react";
import { supabaseClient } from "@/app/utils/supabase-client";
import {
	getColumnsBySlug,
	getProjectBySlug,
} from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import { ColumnType, TaskType } from "@/Types";
import {
	DndContext,
	DragOverlay,
	DragStartEvent,
	DragEndEvent,
	PointerSensor,
	useSensors,
	useSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Token } from "@clerk/nextjs/server";
import { any } from "zod";

interface Props {
	params: { slug: string };
}

const Page: FC<Props> = ({ params }) => {
	const { getToken, userId } = useAuth();

	const [columns, setColumns] = useState<ColumnType[]>([]);
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const [columnsUpdated, setColumnsUpdated] = useState(false);

	const columnsId = useMemo(
		() => columns.map((col) => col.column_id),
		[columns]
	);

	const [tasks, setTasks] = useState<TaskType[]>();

	const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
	const [activeTask, setActiveTask] = useState<TaskType | null>(null);

	interface Project {
		name: string;
		id: number;
	}

	console.log("Columns:", columns); // Debug log

	useEffect(() => {
		const loadColumns = async () => {
			const token = await getToken({ template: "supabase" });
			const columns = await getColumnsBySlug({
				userId: userId ?? "",
				token: token ?? "",
				slug: params.slug,
			});
			setColumns(columns || []);
			setLoading(false);
			setColumnsUpdated(false); // Set columnsUpdated to false after fetching the columns
		};
		loadColumns();
	}, [columnsUpdated]); // Add columnsUpdated as a dependency

	useEffect(() => {
		const loadProject = async () => {
			const token = await getToken({ template: "supabase" });
			const project = await getProjectBySlug({
				userId: userId ?? "",
				token: token ?? "",
				slug: params.slug,
			});
			console.log(project);
			setProject(project || []);
			setLoading(false);
		};
		loadProject();
	}, []);

	const projectId = project?.id;
	function compareNumbers(a: any, b: any) {
		return a - b;
	}

	const sortedColumns = columns.sort((a, b) => {
		const objectA = a?.order ?? 0;
		const objectB = b?.order ?? 0;
		return objectA - objectB;
	});

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		})
	);

	return (
		<div className="">
			<ProjectNav title={project?.name} />
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
			>
				<div className="h-[85vh] overflow-x-scroll flex flex-row space-x-5 mx-5">
					{loading ? (
						<div className="flex flex-row space-x-5">
							<Skeleton className="h-full w-1/3 min-w-[350px]" />
							<Skeleton className="h-full w-1/3 min-w-[350px]" />
							<Skeleton className="h-full w-1/3 min-w-[350px]" />
						</div>
					) : (
						<SortableContext items={columnsId}>
							{sortedColumns.map((column) => (
								<KanbanColumn
									key={column.id}
									name={column.column_name}
									columnId={column.column_id}
									setColumns={setColumns}
								/>
							))}
						</SortableContext>
					)}
					<NewColumn
						projectId={projectId}
						userId={userId ?? ""}
						columns={columns}
						setColumns={setColumns}
					/>
				</div>

				{createPortal(
					<DragOverlay>
						{activeColumn && (
							<KanbanColumn
								name={activeColumn.column_name}
								columnId={activeColumn.column_id}
								setColumns={setColumns}
							/>
						)}
						{activeTask && <Task task={activeTask} />}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
		</div>
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

	async function onDragEnd(event: DragEndEvent) {
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			if (active.data.current?.type === "Column") {
				const from = columns.findIndex(
					(col) => col.column_id === active.id
				);
				const to = columns.findIndex((col) => col.column_id === over.id);

				if (from !== -1 && to !== -1) {
					const updatedColumns = arrayMove(columns, from, to);

					const token = await getToken({ template: "supabase" });
					const supabase = await supabaseClient(token ?? "");

					for (let i = 0; i < updatedColumns.length; i++) {
						const column = updatedColumns[i];
						console.log(
							`Updating column_id: ${column.column_id}, order: ${i}`
						); // Debug log

						// Log the column object before the update
						console.log("Column before update:", column);

						const { data, error } = await supabase
							.from("columns")
							.update({ order: i })
							.eq("column_id", column.column_id);

						if (error) {
							console.error("Failed to update column order:", error);
						} else {
							// Log the updated column data
							console.log("Updated column data:", data);
						}
					}

					setColumns(updatedColumns);
					setColumnsUpdated(true);
				}
			} else if (active.data.current?.type === "Task") {
				// Handle task drag and drop
			}
		}
	}
};

export default Page;
