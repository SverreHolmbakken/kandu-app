"use client";

import Header from "./components/layout/header";
import Aside from "./components/layout/aside";
import Main from "./components/layout/main";
import { getTasks, getBoards } from "./utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
	const { isSignedIn, userId, getToken } = useAuth();
	const [loadingTasks, setLoadingTasks] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [boards, setBoards] = useState<Board[]>([]);

	console.log(userId);

	useEffect(() => {
		const loadTasks = async () => {
			const token = await getToken({ template: "supabase" });
			const tasks = await getTasks({
				userId: userId ?? "",
				token: token ?? "",
			});
			setTasks(tasks || []);
		};
		loadTasks();
	}, []);

	useEffect(() => {
		const loadBoards = async () => {
			const token = await getToken({ template: "supabase" });
			const boards = await getBoards({
				userId: userId ?? "",
				token: token ?? "",
			});
			setBoards(boards || []);
		};
		loadBoards();
	}, []);

	console.log(boards);

	interface Task {
		id: number;
		title: string;
		description: string;
	}

	interface Board {
		id: number;
		board_name: string;
		owner_id: string;
	}

	return (
		<div className="flex h-screen flex-col justify-between m-auto text-primaryDark">
			<section className="flex w-full lg:px-36 md:px-8 px-1 h-screen">
				<Aside />
				<Main />
				<div>
					<h1></h1>
					{isSignedIn &&
						boards.map((board: Board) => (
							<div key={board.id}>
								<p>{board.board_name}</p>
								<p>{board.owner_id}</p>
							</div>
						))}
				</div>
				<div>
					{isSignedIn &&
						tasks.map((task: Task) => (
							<div key={task.id}>
								<p>{task.title}</p>
								<p>{task.description}</p>
							</div>
						))}
				</div>
			</section>
		</div>
	);
}
