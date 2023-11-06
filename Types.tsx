export type TaskType = {
	task_id: string;
	title: string;
	description: string;
	column_id: string;
};

export type TaskShortType = {
	name: string;
	description: string;
	task_id: string;
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

export type ProjectType = {
	name: string;
	description: string;
	accessed_by: string[];
	owner_id: string;
	card_color: string;
	slug: string;
	created_at?: string;
};

export type ProjectShortType = {
	name: string;
	description: string;
	slug: string;
};
