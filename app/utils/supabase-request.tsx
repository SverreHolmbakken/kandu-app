import { supabaseClient } from "./supabase-client";

export const postTask = async ({
	userId,
	token,
	task,
}: {
	userId: string;
	token: string;
	task: {
		title: string;
		description: string;
		column_id: string;
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: newTask, error } = await supabase
		.from("tasks")
		.insert([{ ...task, user_id: userId }]);
	if (error) {
		console.log(error);
		return false;
	}
	return newTask;
};

export const postProject = async ({
	token,
	project,
	userId,
}: {
	userId?: string[];
	token: string;
	project: {
		name: string;
		accessed_by: string[];
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: newProject, error } = await supabase.from("projects").insert([
		{
			...project,
			accessed_by: [...project.accessed_by, ...(userId ?? [])],
		},
	]);
	if (error) {
		console.log(error);
		return false;
	}
	return newProject;
};

export const postColumn = async ({
	token,
	column,
}: {
	userId?: string;
	token: string;
	column: {
		column_name: string;
		project_id: number;
		userId?: string;
		// accessed_by: string[];
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: newColumn, error } = await supabase
		.from("columns")
		.insert([column]);
	if (error) {
		console.log(error);
		return false;
	}
	return newColumn;
};

export const getProjects = async ({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: projects } = await supabase
		.from("projects")
		.select()
		.contains("accessed_by", [userId, userId ?? ""]);
	return projects;
};

export const getColumnsBySlug = async ({
	userId,
	token,
	slug,
}: {
	userId: string;
	token: string;
	slug: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: project, error } = await supabase
		.from("projects")
		.select("id")
		.eq("slug", slug)
		.single();
	if (error) {
		console.log(error);
		return false;
	}
	const { data: columns } = await supabase
		.from("columns")
		.select("*")
		.eq("project_id", project.id);
	// .contains("accessed_by", [userId, userId ?? ""]);
	return columns;
};

export const getProjectBySlug = async ({
	userId,
	token,
	slug,
}: {
	userId: string;
	token: string;
	slug: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: project, error } = await supabase
		.from("projects")
		.select("*")
		.eq("slug", slug)
		.single();
	if (error) {
		console.log(error);
		return false;
	}
	return project;
};

export const getTasksByColumnId = async ({
	userId,
	token,
	columnId,
}: {
	userId: string;
	token: string;
	columnId: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: tasks } = await supabase
		.from("tasks")
		.select("*")
		.eq("column_id", columnId);
	return tasks;
};

export const updateTask = async ({
	token,
	task,
}: {
	token: string;
	task: {
		name: string;
		description: string;
		task_id: string;
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: updateColumn, error } = await supabase
		.from("tasks")
		.update({ title: task.name, description: task.description })
		.eq("task_id", task.task_id)
		.select();
	if (error) {
		console.log(error);
		return false;
	}
	return updateColumn;
};

export const deleteTask = async ({
	token,
	taskId,
}: {
	token: string;
	taskId: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data, error } = await supabase
		.from("tasks")
		.delete()
		.eq("task_id", taskId)
		.select();
	console.log(data, "deletedColumn");
	if (error) {
		console.log(error);
		return false;
	}
};

export const updateColumn = async ({
	token,
	column,
}: {
	token: string;
	column: {
		name: string;
		id: string;
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: updateColumn, error } = await supabase
		.from("columns")
		.update({ column_name: column.name })
		.eq("column_id", column.id)
		.select();
	if (error) {
		console.log(error);
		return false;
	}
	return updateColumn;
};

export const deleteColumn = async ({
	token,
	columnId,
}: {
	token: string;
	columnId: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data, error } = await supabase
		.from("columns")
		.delete()
		.eq("column_id", columnId)
		.select();
	console.log(data, "deletedColumn");
	if (error) {
		console.log(error);
		return false;
	}
};

export const updateProject = async ({
	token,
	project,
}: {
	token: string;
	project: {
		name: string;
		description: string;
		slug: string;
	};
}) => {
	const supabase = await supabaseClient(token);
	const { data: updateProject, error } = await supabase
		.from("projects")
		.update({ name: project.name, description: project.description })
		.eq("slug", project.slug)
		.select();
	if (error) {
		console.log(error);
		return false;
	}
	return updateProject;
};

export const deleteProject = async ({
	token,
	slug,
}: {
	token: string;
	slug: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data, error } = await supabase
		.from("projects")
		.delete()
		.eq("slug", slug)
		.select();
	console.log(data, "deletedProject");
	if (error) {
		console.log(error);
		return false;
	}
};
