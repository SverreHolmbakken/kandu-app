"use client";

import { useAuth } from "@clerk/nextjs";
import Hero from "./components/landing-page/hero";
import Demo from "./components/landing-page/demo";
import About from "./components/landing-page/about";

export default function Home() {
	return (
		<div className="flex flex-col w-full h-full absolute overflow-x-hidden">
			<div className=" bg-purple-100 dark:bg-purple-400/50 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
			<div className=" bg-blue-200 dark:bg-blue-400/20 absolute top-[-1rem] -z-10 left-[11rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
			<main className="flex flex-col justify-between">
				<Hero />
				<Demo />
				<About />
			</main>
		</div>
	);
}
