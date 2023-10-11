"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { ModeToggle } from "./themebutton";

function Header() {
	const { isSignedIn } = useAuth();

	return (
		<div className="flex flex-row w-full justify-between items-center py-2 lg:px-36 md:px-8 px-1 bg-transparent">
			<Link href="/" className="flex flex-row items-center gap-6">
				<img src="/kandu-logo.svg" alt="" />
				<h1 className="text-primaryDark font-bold text-3xl dark:text-white">
					Kandu
				</h1>
			</Link>

			<div className="flex justify-end gap-8">
				{!isSignedIn && (
					<Button>
						<Link href="/sign-in">Sign in</Link>
					</Button>
				)}

				{isSignedIn && (
					<div className="flex flex-row items-center">
						<Button variant="link">
							<Link href="/dashboard">Dashboard</Link>
						</Button>

						<ClerkLoading>
							<Skeleton className="h-8 w-8 bg-slate-400 rounded-full" />
						</ClerkLoading>

						<ClerkLoaded>
							<UserButton />
						</ClerkLoaded>
					</div>
				)}
				<ModeToggle />
			</div>
		</div>
	);
}

export default Header;
