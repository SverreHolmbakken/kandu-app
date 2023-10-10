"use client";

import Aside from "./components/layout/aside";
import Main from "./components/layout/main";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
	const { userId } = useAuth();

	console.log(userId);

	return (
		<div className="flex h-screen flex-col justify-between m-auto text-primaryDark">
			<section className="flex w-full lg:px-36 md:px-8 px-1 h-screen">
				<Aside />
				<Main />
			</section>
		</div>
	);
}
