import { Plus } from "lucide-react";

export default function CreateProjectButton() {
	return (
		<button className="flex rounded-md w-1/5 p-extraLargePadding mt-10 place-content-center border-solid border-[1px] border-primaryDark opacity-50 hover:opacity-40">
			<div className="block w-5 h-5">
				<Plus />
			</div>
		</button>
	);
}
