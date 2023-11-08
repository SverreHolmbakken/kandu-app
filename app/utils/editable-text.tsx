"use client";
import { useEffect, useState } from "react";
import { updateColumn } from "./supabase-request";
import { useAuth } from "@clerk/nextjs";

export default function EditableText({ columnId, setText, text }: any) {
	const [isEditing, setIsEditing] = useState(false);
	const { getToken } = useAuth();

	type Column = {
		id: string;
		name: string;
	};

	const updateColumnName = async (columnId: string) => {
		const column: Column = {
			name: text,
			id: columnId,
		};
		const token = await getToken({ template: "supabase" });
		const response = await updateColumn({
			token: token ?? "",
			column: column,
		});
	};

	const handleDoubleClick = () => {
		console.log("double clicked");
		setIsEditing(true);
	};

	const handleChange = (event: any) => {
		setText(event.target.value);
	};

	const handleBlur = async () => {
		setIsEditing(false);
		// This is where the input value gets sent to the database
		updateColumnName(columnId);
	};

	return (
		<div onDoubleClick={handleDoubleClick}>
			{isEditing ? (
				<input
					type="text"
					value={text}
					onChange={handleChange}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							handleBlur();
						}
					}}
					onBlur={handleBlur}
					autoFocus
				/>
			) : (
				<span>{text}</span>
			)}
		</div>
	);
}
