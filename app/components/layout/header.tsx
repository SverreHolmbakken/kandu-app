"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

function Header() {
	const { isSignedIn } = useAuth();

	return (
		<div className="flex flex-row w-full justify-between items-center py-2 px-36 bg-transparent">
			<Link href="/" className="flex flex-row items-center gap-6">
				<img src="/kandu-logo.svg" alt="" />
				<h1 className="text-slate-900 font-bold text-3xl">Kandu</h1>
			</Link>

			{!isSignedIn && (
				<Button>
					<Link href="/sign-in">Sign in</Link>
				</Button>
			)}

			{isSignedIn && (
				<div className="flex flex-row items-center gap-8">
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
		</div>
	);
}

export default Header;
