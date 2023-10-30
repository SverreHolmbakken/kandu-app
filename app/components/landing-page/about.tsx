import React from "react";
import ContactCard from "./about-contact-card";
import { authors } from "@/app/lib/authordata";

export default function About() {
	const authorList = authors;
	return (
		<section className="h-screen">
			<div className="ml-20 text-3xl">Get in touch</div>
			<div className="flex justify-center items-center">
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
		</section>
	);
}
