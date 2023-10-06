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

export const getBoards = async ({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) => {
	const supabase = await supabaseClient(token);
	const { data: boards } = await supabase
		.from("boards")
		.select("*")
		.eq("accessed_by", userId);
	return boards;
};

export const getColumns = async ({
	userId,
	token,
	boardId,
}: {
	userId: string;
	token: string;
	boardId: number;
}) => {
	const supabase = await supabaseClient(token);
	const { data: columns } = await supabase
		.from("columns")
		.select("*")
		.eq("board_id", boardId)
		.eq("user_id", userId);
	return columns;
};
