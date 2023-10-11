import React from "react";
import { Plus } from "lucide-react";

export default function NewColumn() {
	return (
		<div className="w-1/4 h-full border rounded-md border-b flex items-center justify-center transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
			<Plus className="text-secondaryDark" />
		</div>
	);
}
