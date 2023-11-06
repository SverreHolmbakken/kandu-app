import React from "react";
import { Plus } from "lucide-react";
import { postColumn } from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { ColumnType } from "@/Types";
import { columnsAtom } from "@/Atoms";
import { v4 as uuidv4 } from "uuid";

export default function NewColumn({
	projectId,
	userId,
	columns,
	setColumns,
}: {
	projectId?: number;
	userId?: string;
	columns: ColumnType[];
	setColumns: (columns: ColumnType[]) => void;
}) {
	type Column = {
		column_id: string;
		column_name: string;
		project_id: number;
		user_id?: string;
	};
	const { getToken } = useAuth();

	const newColumn = async (projectId: number) => {
		const column: Column = {
			column_id: uuidv4(),
			column_name: "New column",
			project_id: projectId,
			user_id: userId,
		};
		const token = await getToken({ template: "supabase" });
		const response = await postColumn({
			token: token ?? "",
			column: column,
		});
		setColumns([
			...columns,
			{
				column_id: column.column_id,
				column_name: column.column_name,
				project_id: projectId,
				created_at: Date.now().toString(),
			},
		]);
	};

	function handleClick() {
		newColumn(projectId ?? 0);
	}

	return (
		<button
			onClick={handleClick}
			className="w-1/4  min-w-[350px] h-full border rounded-md border-b flex items-center justify-center transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 dark:border-zinc-600"
		>
			<Plus className="text-secondaryDark" />
		</button>
	);
}
