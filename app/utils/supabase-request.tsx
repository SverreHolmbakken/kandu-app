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

// export const getColumns = async ({
// 	userId,
// 	token,
// 	boardId,
// }: {
// 	userId: string;
// 	token: string;
// 	boardId: number;
// }) => {
// 	const supabase = await supabaseClient(token);
// 	const { data: columns } = await supabase
// 		.from("columns")
// 		.select("*")
// 		.eq("board_id", boardId)
// 		.eq("user_id", userId);
// 	return columns;
// };
