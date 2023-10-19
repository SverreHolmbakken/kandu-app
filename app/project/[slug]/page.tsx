"use client";

import { FC, useEffect, useState } from "react";
import {
	getColumnsBySlug,
	getProjectBySlug,
} from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import KanbanColumn from "@/app/components/layout/kanban/kanban-column";
import KanbanLayout from "@/app/components/layout/kanban/kanban-layout";
import ProjectNav from "@/app/components/layout/project-nav";
import NewColumn from "@/app/components/layout/kanban/kanban-cloumn-new";

interface Props {
	params: { slug: string };
}

const Page: FC<Props> = ({ params }) => {
	const { getToken, userId } = useAuth();

	const [columns, setColumns] = useState<Column[]>([]);
	const [project, setProject] = useState<Project | null>(null);

	interface Column {
		id: number;
		column_name: string;
		description: string;
		project_id: number;
	}

	interface Project {
		name: string;
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
		};
		loadProject();
	}, []);

	return (
		<div>
			<ProjectNav title={project?.name} />
			<div className="h-[80vh] flex flex-row space-x-5 mx-5">
				{columns.map((column) => (
					<KanbanColumn
						key={column.id}
						name={column.column_name}
						columnId={column.id}
					/>
				))}
				<NewColumn />
			</div>
		</div>
	);
};

export default Page;
