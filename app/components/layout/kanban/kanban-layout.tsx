import React from "react";
import KanbanColumn from "./kanban-column";
import NewColumn from "./kanban-cloumn-new";

export default function KanbanLayout() {
	return (
		<div className="h-[80vh] flex flex-row flex-1 space-x-5 mx-5">
			<KanbanColumn />
			<NewColumn />
		</div>
	);
}
