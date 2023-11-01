export type TaskType = {
	task_id: string;
	title: string;
	description: string;
	column_id: string;
};

export type KanbanColumnProps = {
	name: string;
	columnId: string;
};

export type ColumnType = {
	id?: number;
	column_id: string;
	column_name: string;
	project_id: number;
	created_at: string;
};