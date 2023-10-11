import EditColumn from "./kanban-column-edit";
import Task from "./task";
import TaskModal from "./task-modal";

export default function KanbanColumn() {
	return (
		<div className="rounded-md border w-1/4 h-full">
			<div className="h-12 px-4 text-left align-middle border-b font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between">
				<div className="mr-2">Column name</div>
				<div className="ml-auto flex items-center">
					<TaskModal />
				</div>
				<div className="ml-2 flex items-center">
					<EditColumn />
				</div>
			</div>
			<div className="h-full transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
				<div className="p-4 align-middle">
					<Task />
				</div>
			</div>
		</div>
	);
}
