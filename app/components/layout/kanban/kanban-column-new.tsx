import React from "react";
import { Plus } from "lucide-react";
import { postColumn } from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";

export default function NewColumn({ projectId }: { projectId?: number }) {
	type Column = {
		column_name: string;
		project_id: number;
	};
	const { getToken } = useAuth();

	const newColumn = async (projectId: number) => {
		const column: Column = {
			column_name: "New column",
			project_id: projectId,
		};
		const token = await getToken({ template: "supabase" });
		const response = await postColumn({
			token: token ?? "",
			column: column,
		});
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
