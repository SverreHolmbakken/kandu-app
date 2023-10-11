import { UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Plus } from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../ui/tooltip";

export default function ProjectNav() {
	return (
		<div className="w-screen h-[52px] px-5 py-2.5 justify-between items-center inline-flex">
			<div className="text-black text-2xl font-medium leading-none dark:text-zinc-300">
				Project title
			</div>
			{/* TODO: API to fetch user avatar */}
			<div className="w-20 h-8 relative">
				<div className="w-8 h-8 left-[48px] top-0 absolute">
					<Avatar>
						<UserButton />
					</Avatar>
				</div>
				<div className="w-8 h-8 left-[32px] top-0 absolute">
					<Avatar>
						<UserButton />
					</Avatar>
				</div>
				<div className="w-8 h-8 left-[16px] top-0 absolute">
					<Avatar>
						<UserButton />
					</Avatar>
				</div>
				<div className="w-8 h-8 left-0 top-0 absolute">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="w-8 h-8 bg-slate-200 rounded-full flex justify-center items-center">
									<Plus className="w-4 h-4" />
								</div>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Invite collaborators</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
}
