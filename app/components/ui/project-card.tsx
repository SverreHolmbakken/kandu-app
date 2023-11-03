import { CalendarDays, Edit, MoreHorizontal } from "lucide-react";

import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "./card";
import EditProject from "../layout/kanban/project/edit-project";

interface ProjectCardProps {
	name: string;
	description: string;
	date: string;
	color: string;
	slug: string;
	setProjects: any;
	projects: any;
}

export default function ProjectCard({
	name,
	description,
	date,
	color,
	slug,
	setProjects,
	projects,
}: ProjectCardProps) {
	function handleOpenMore() {
		console.log("More");
	}
	return (
		<Card className="flex flex-col h-80 rounded-md hover:opacity-90">
			{/* // <Link
		// 	className="flex flex-col h-full rounded-md hover:opacity-90"
		// 	// href={"/project/" + slug}
		// > */}
			<Link
				className="flex w-full h-3/4 rounded-t-md"
				href={"/project/" + slug}
			>
				<CardHeader
					className={`flex w-full h-full rounded-t-md`}
					style={{ backgroundColor: color }}
				></CardHeader>
			</Link>
			<CardContent className="flex flex-col rounded-t-none">
				<div className="flex flex-col w-full text-start p-1">
					<h2 className="text-mediumFont font-semibold text-primaryDark dark:text-zinc-200">
						<Link href={"/project/" + slug}>{name}</Link>
					</h2>
					<p className="text-smallFont text-secondaryDark dark:text-zinc-400">
						{description}
					</p>
					<div className="flex justify-between">
						<div className="flex flex-row gap-2 text-smallFont h-4 mt-1">
							<CalendarDays className="h-full w-4 text-secondaryDark dark:text-zinc-300" />
							<p className="text-center text-secondaryDark dark:text-zinc-200">
								Created {date}
							</p>
						</div>
						<EditProject
							slug={slug}
							setProjects={setProjects}
							projects={projects}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
