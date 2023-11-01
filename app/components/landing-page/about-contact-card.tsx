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
		<Card className=" flex flex-col overflow-hidden w-64 min-h-[530px] shadow-lg">
			<div className="flex-none">
				<Image
					src={avatar}
					alt="Authors avatar"
					width={200}
					height={200}
					className="grayscale object-cover w-full h-64"
				/>
			</div>
			<div className="flex flex-col flex-grow justify-between p-4 bg-white dark:bg-zinc-800">
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{title}</CardDescription>
				</CardHeader>
				<CardFooter className="flex gap-2 content-evenly p-4 place-items-end">
					{github && (
						<a target="_blank" href={github}>
							<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
								<Github />
							</button>
						</a>
					)}
					{linkedin && (
						<a target="_blank" href={linkedin}>
							<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
								<Linkedin />
							</button>
						</a>
					)}
					{cv && (
						<a target="_blank" href={cv}>
							<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
								<FileText />
							</button>
						</a>
					)}
					{mail && (
						<a href={`mailto:${mail}`}>
							<button className="bg-white dark:bg-zinc-700 border shadow-sm rounded-sm p-2 ease-in-out duration-500 transition-all hover:rounded-3xl hover:invert">
								<Mail />
							</button>
						</a>
					)}
				</CardFooter>
			</div>
		</Card>
	);
}
