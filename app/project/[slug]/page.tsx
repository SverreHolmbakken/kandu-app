"use client";

import { FC, useEffect, useState } from "react";
import {
	getColumnsBySlug,
	getProjectBySlug,
} from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import KanbanColumn from "@/app/components/layout/kanban/column/column";
import ProjectNav from "@/app/components/layout/kanban/project/project-nav";
import NewColumn from "@/app/components/layout/kanban/column/column-new";
import { ColumnType } from "@/Types";
import { Skeleton } from "@/app/components/ui/skeleton";

interface Props {
	params: { slug: string };
}

const Page: FC<Props> = ({ params }) => {
	const { getToken, userId } = useAuth();

	const [columns, setColumns] = useState<ColumnType[]>([]);
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);

	interface Project {
		name: string;
		id: number;
	}

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
		};
		loadColumns();
	}, []);
	console.log(columns, "columns");

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
		const dateA = new Date(a?.created_at);
		const dateB = new Date(b?.created_at);
		return dateA.getTime() - dateB.getTime();
	});

	return (
		<div className="">
			<ProjectNav title={project?.name} />
			<div className="h-[85vh] overflow-x-scroll flex flex-row space-x-5 mx-5">
				{loading ? (
					<div className="flex flex-row space-x-5">
						<Skeleton className="h-full w-1/3 min-w-[350px]" />
						<Skeleton className="h-full w-1/3 min-w-[350px]" />
						<Skeleton className="h-full w-1/3 min-w-[350px]" />
					</div>
				) : (
					<>
						{sortedColumns.sort(compareNumbers).map((column) => (
							<KanbanColumn
								key={column.id}
								name={column.column_name}
								columnId={column.column_id}
							/>
						))}
					</>
				)}
				<NewColumn
					projectId={projectId}
					userId={userId ?? ""}
					columns={columns}
					setColumns={setColumns}
				/>
			</div>
		</div>
	);
};

export default Page;
