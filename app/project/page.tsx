import ProjectNav from "../components/layout/project-nav";

export default function Project() {
<<<<<<< HEAD
  return <ProjectNav />;
=======
  return (
    <div className="w-screen h-[52px] px-28 py-2.5 justify-between items-center inline-flex">
      <div className="text-black text-xl font-medium font-['Inter'] leading-none">
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
              <TooltipContent>
                <p>Invite collaborators</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
>>>>>>> a153bce (Added todo)
}
