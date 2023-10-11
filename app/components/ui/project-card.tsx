import { CalendarDays } from "lucide-react";

export default function ProjectCard(props: any) {
	const { name, description, date, color } = props;

	const elementStyle = "flex w-full h-3/4 bg-[" + color + "]";

	return (
		<button className="flex flex-col h-80 rounded-md border-solid border-[1px] border-secondaryLight hover:opacity-90">
			<div className={elementStyle} />
			<div className="flex flex-col w-full text-start p-1">
				<h2 className="text-mediumFont font-semibold text-primaryDark dark:text-zinc-200">
					{name}
				</h2>
				<p className="text-smallFont text-secondaryDark dark:text-zinc-400">
					{description}
				</p>
				<span className="flex flex-row gap-2 text-smallFont h-4 mt-1">
					<CalendarDays className="h-full w-4 text-secondaryDark dark:text-zinc-300" />
					<p className="text-center text-secondaryDark dark:text-zinc-200">
						{date}
					</p>
				</span>
			</div>
		</button>
	);
}
