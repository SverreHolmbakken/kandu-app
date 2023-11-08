"use client";

import React, { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as z from "zod";
import { useForm, FormProvider, useFormContext, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogFooter,
	DialogClose,
} from "@/app/components/ui/dialog";
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/app/components/ui/card";
import { PlusSquare } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { Input } from "@/app/components/ui/input";
import {
	Form,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
	FormField,
	FormControl,
} from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { postTask, updateColumn } from "@/app/utils/supabase-request";

const formSchema = z.object({
	columnName: z.string().min(1).max(30),
	columnId: z.string(),
});

export default function EditColumnName({
	columnId,
	setColumns,
	setText,
	setOpenDropdown,
	text,
}: {
	columnId: string;
	setColumns: (columns: any) => void;
	setText: (text: string) => void;
	setOpenDropdown: (open: boolean) => void;
	text: string;
}) {
	const { toast } = useToast();
	const { userId, getToken } = useAuth();

	const [open, setOpenDialog] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		form.setValue("columnName", text);
		form.setValue("columnId", columnId);
	}, [columnId, text, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const result = formSchema.safeParse(values);
		console.log(values);
		console.log(userId);
		updateColumnName();

		if (result.success) {
			setOpenDialog(false);
			setOpenDropdown(false);
		} else {
			setOpenDialog(true);
		}

		try {
			form.reset({
				columnName: "",
			});
		} catch (error) {
			console.error(error);
		}
	}

	type Column = {
		name: string;
		id: string;
	};

	const updateColumnName = async () => {
		const { columnName } = form.getValues();
		const column: Column = {
			name: columnName,
			id: columnId,
		};
		const token = await getToken({ template: "supabase" });
		const updateNewName = await updateColumn({
			token: token ?? "",
			column: column,
		});
		setColumns((current: any[]) =>
			current.map((column) => {
				if (column.column_id === columnId) {
					return {
						...column,
						name: columnName,
					};
				}
				return column;
			})
		);
		setText(columnName);
	};

	return (
		<Dialog open={open} onOpenChange={setOpenDialog}>
			<DialogTrigger>Edit name</DialogTrigger>
			<DialogContent>
				<CardHeader>
					<CardTitle>Column</CardTitle>
					<CardDescription>Edit column name.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="columnName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Column Name</FormLabel>
										<FormControl>
											<Input placeholder="column name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter className="flex w-full justify-end">
								<Button
									type="submit"
									onClick={() => {
										toast({
											description: "Column name has been updated.",
										});
									}}
								>
									Update column name
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
}
