"use client";

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ChevronDownSquare } from "lucide-react";

export default function Home() {
	const { userId } = useAuth();

	console.log(userId);

	return (
		<div className="flex item center h-screen w-screen flex-col">
			<div className=" bg-purple-100 dark:bg-purple-400/50 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
			<div className=" bg-blue-200 dark:bg-blue-400/20 absolute top-[-1rem] -z-10 left-[11rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
			<main>
				<section className="flex w-full h-full absolute overflow-x-hidden">
					<div className="text-5xl font-extrabold w-[50vw] m-20">
						<motion.span
							className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: "spring",
								delay: 0,
								duration: 0.7,
							}}
						>
							Kandu
						</motion.span>
						<motion.span
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								delay: 0.1,
								duration: 3,
							}}
						>
							{" "}
							is an app devoloped by newgrads in need of a job.
						</motion.span>
					</div>
					<motion.div
						className="object-contain absolute bottom-0 -right-44 z-10"
						initial={{ x: 700, y: -300 }}
						animate={{ x: 0, y: -80 }}
						transition={{
							type: "spring",
							duration: 0.7,
						}}
					>
						<Image
							src="/kandu-hero-image.png"
							alt=""
							width="800"
							height="800"
							quality="100"
							priority={true}
							className=""
						/>
					</motion.div>
					<div className="flex absolute justify-center bottom-28 left-1/2 animate-bounce z-20">
						<ChevronDownSquare className="text-slate-700/50 w-10 h-10" />
					</div>
				</section>
			</main>
		</div>
	);
}
