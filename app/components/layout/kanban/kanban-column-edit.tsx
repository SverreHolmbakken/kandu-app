import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { deleteColumn } from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";

export default function EditColumn({ columnId }: { columnId: number }) {
	const { getToken } = useAuth();

	async function handleDelete() {
		const token = await getToken({ template: "supabase" });
		await deleteColumn({
			token: token ?? "",
			columnId: columnId,
		});
	}
	console.log(columnId, "columnId");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Edit column</DropdownMenuItem>
				<DropdownMenuItem className=" text-red-500">
					<button onClick={handleDelete}>Delete column</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
