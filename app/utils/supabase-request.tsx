import { supabaseClient } from "./supabase-client";

export const getTasks = async ({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: tasks } = await supabase
		.from("tasks")
		.select("*")
		.eq("user_id", userId);
	return tasks;
};

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
		column_id: number;
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

export const getColumns = async ({
	userId,
	token,
	projectId,
}: {
	userId: string;
	token: string;
	projectId: number;
}) => {
	const supabase = await supabaseClient(token);
	const { data: columns } = await supabase
		.from("columns")
		.select("*")
		.eq("project_id", projectId)
		.eq("user_id", userId);
	return columns;
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
		.eq("project_id", project.id)
		// .eq("accessed_by", userId)
		.contains("accessed_by", [userId, userId ?? ""]);
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
