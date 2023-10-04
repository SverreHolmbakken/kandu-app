import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Kandu",
	description: "Kandu is a simple kanban board for your projects.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Header />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
