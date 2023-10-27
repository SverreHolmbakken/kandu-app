import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowBigDownDash } from "lucide-react";

export default function Hero() {
	return (
		<section className="h-[calc(100vh-82px)] relative">
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
					is an app developed by newgrads in need of a job.
				</motion.span>
			</div>

			<div className="ml-20 absolute bottom-28 w-[30vw] h-[18vh] p-4 text-gray-800 bg-white rounded-lg shadow dark:bg-zinc-700/50 dark:text-white">
				<div className="mb-2 h-full flex">
					<div className="h-3 text-3xl place-self-start ">“</div>
					<p className="px-4 text-md  dark:text-white self-center justify-self-center">
						Technologies used in this app: Next.js, TypeScript, Supabase,
						Clerk, TailwindCSS, Framer Motion and more.
					</p>
					<div className="h-3 text-3xl place-self-end text-gray-600 dark:text-white">
						”
					</div>
				</div>
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
			<ArrowBigDownDash className="absolute bottom-5 left-1/2 animate-bounce opacity-40" />
		</section>
	);
}
