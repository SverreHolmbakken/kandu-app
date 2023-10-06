import { UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Plus } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

export default function Project() {
  return (
    <div className="w-screen h-[52px] px-28 py-2.5 justify-between items-center inline-flex">
      <div className="text-black text-xl font-medium font-['Inter'] leading-none">
        Project title
      </div>
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
              <TooltipContent>
                <p>Invite collaborators</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
