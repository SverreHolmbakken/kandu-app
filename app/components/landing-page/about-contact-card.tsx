import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { authors } from "@/app/lib/authordata";
import Image from "next/image";

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
	console.log(avatar);
	return (
		<div>
			<Card>
				<div className="h-3/4 w-full">
					<Image
						src={avatar}
						alt="placeholder"
						width={200}
						height={200}
						className="grayscale object-fill overflow-hidden rounded-t- h-full"
					/>
				</div>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{title}</CardDescription>
				</CardHeader>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
}
