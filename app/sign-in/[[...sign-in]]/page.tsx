import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex items-center justify-center h-[80vh]">
			<SignIn redirectUrl="/dashboard" />
		</div>
	);
}
