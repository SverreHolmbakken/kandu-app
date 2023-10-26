export type TaskType = {
	id: number;
	title: string;
	description: string;
	column_id: number;
};

export type KanbanColumnProps = {
	name: string;
	columnId: number;
};

export type ColumnType = {
	id: number;
	column_name: string;
	description: string;
	project_id: number;
	created_at: string;
};
