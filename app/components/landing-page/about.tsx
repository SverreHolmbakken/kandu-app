import React from "react";
import ContactCard from "./about-contact-card";
import { authors } from "@/app/lib/authordata";

export default function About() {
	const authorList = authors;
	return (
		<section className="relative h-screen mt-20 overflow-hidden">
			<div className="ml-20">
				<span className="text-4xl font-bold ">Get in touch with us</span>
				<p className="text-l text-zinc-700">
					Feel free to contact us via the links below.
				</p>
			</div>
			<div className="flex justify-center items-center gap-11 h-3/4">
				{authorList.map((author) => (
					<ContactCard
						name={author.name}
						avatar={author.avatar}
						title={author.title}
						github={author.github}
						linkedin={author.linkedin}
						cv={author.cv}
						mail={author.mail}
					/>
				))}
			</div>
			<div className=" bg-blue-200 dark:bg-blue-400/20absolute bottom-0 right-0 overflow-hidden h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] -z-10"></div>
			<div className="absolute bottom-0 right-0 bg-purple-100 dark:bg-purple-400/50 overflow-hidden h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] -z-10"></div>
		</section>
	);
}
