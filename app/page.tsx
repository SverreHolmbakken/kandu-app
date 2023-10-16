"use client";

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
	const { userId } = useAuth();

	console.log(userId);

	return (
		<div className="flex h-screen flex-col justify-between m-auto text-primaryDark">
			<div className=" bg-purple-100 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
			<div className=" bg-blue-200 absolute top-[-1rem] -z-10 left-[11rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
			<main>
				<section className="flex w-screen h-screen absolute">
					<Image
						src="/kandu-hero-image.png"
						alt=""
						width="800"
						height="800"
						quality="100"
						priority={true}
						className="object-scale-down absolute bottom-0 -right-44 z-10"
					/>
				</section>
			</main>
		</div>
	);
}
