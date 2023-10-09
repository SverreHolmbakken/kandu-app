import { Plus } from "lucide-react";

export default function CreateProjectCard() {
	return (
		<button className="flex place-items-center rounded-md h-80 place-content-center border-solid border-[1px] border-secondaryLight hover:opacity-90">
			<div className="block w-5 h-5 justify-center">
				<Plus className="text-secondaryDark" />
			</div>
		</button>
	);
}
