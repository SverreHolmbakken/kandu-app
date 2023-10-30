import React from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { authors } from "@/app/lib/authordata";
import Image from "next/image";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

type AuthorProps = (typeof authors)[number];

export default function ContactCard({
	name,
	avatar,
	title,
	github,
	linkedin,
	cv,
	mail,
}: AuthorProps) {
	return (
		<Card className="overflow-hidden w-64 shadow-lg">
			<div className="flex-none">
				<Image
					src={avatar}
					alt="Authors avatar"
					width={200}
					height={200}
					className="grayscale object-cover w-full h-48"
				/>
			</div>
			<div className="flex flex-col flex-grow p-4 bg-white dark:bg-zinc-800">
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{title}</CardDescription>
				</CardHeader>
				<CardFooter className="flex gap-2 content-evenly p-4">
					<a href={github}>
						<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
							<Github />
						</button>
					</a>
					<a href={linkedin}>
						<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
							<Linkedin />
						</button>
					</a>
					<a href="{cv}">
						<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
							<FileText />
						</button>
					</a>
					<a href="mailto:{mail}">
						<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
							<Mail />
						</button>
					</a>
				</CardFooter>
			</div>
		</Card>
	);
}
