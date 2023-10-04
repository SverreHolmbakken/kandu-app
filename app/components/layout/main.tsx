import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Main() {
	return (
		<div className="bg-slate-200 h-full w-full p-10">
			<h1>Main</h1>

			<Button> default </Button>
			<Button variant="destructive"> destructive </Button>
			<Button variant="outline"> outline </Button>
			<Button variant="secondary"> secondary </Button>
			<Button variant="ghost"> ghost </Button>
			<Button variant="link"> link </Button>
			<Button variant="gradient"> gradient </Button>
			<UserButton />
		</div>
	);
}
