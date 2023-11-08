"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as z from "zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
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
import { postTask } from "@/app/utils/supabase-request";
import { TaskType } from "@/Types";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
	taskId: z.string(),
	taskTitle: z.string().min(1).max(30),
	taskDescription: z.string().min(0).max(200),
	taskColumn: z.string(),
});

export default function CreateTaskModal({
	setTasks,
	columnId,
	tasks,
}: {
	setTasks: (tasks: TaskType[]) => void;
	columnId: string;
	tasks: TaskType[];
}) {
	const { toast } = useToast();
	const { userId, getToken } = useAuth();

	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			taskId: uuidv4(),
			taskTitle: "",
			taskDescription: "",
			taskColumn: columnId,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const result = formSchema.safeParse(values);
		console.log(values);
		console.log(userId);
		newTask();

		if (result.success) {
			setOpen(false);
		} else {
			setOpen(true);
		}

		try {
			form.reset({
				taskId: uuidv4(),
				taskTitle: "",
				taskDescription: "",
				taskColumn: columnId,
			});
		} catch (error) {
			console.error(error);
		}
	}

	interface Task {
		task_id: string;
		title: string;
		description: string;
		column_id: string;
	}

	const newTask = async () => {
		const { taskId, taskTitle, taskDescription } = form.getValues();
		const task: Task = {
			task_id: taskId,
			title: taskTitle,
			description: taskDescription,
			column_id: columnId,
		};
		const token = await getToken({ template: "supabase" });
		const postNewTask = await postTask({
			userId: userId ?? "",
			token: token ?? "",
			task: task,
		});
		setTasks([...tasks, task]);
		toast({
			title: "Success!",
			description: "Task created.",
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{" "}
				<PlusSquare />{" "}
			</DialogTrigger>
			<DialogContent>
				<CardHeader>
					<CardTitle>New task</CardTitle>
					<CardDescription>Create a new task.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="taskTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{" "}
											<div className="flex flex-row gap-1">
												Task name{" "}
												<div className="text-xs text-red-400">
													required
												</div>
											</div>
										</FormLabel>
										<FormControl>
											<Input placeholder="task name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="taskDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Task description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe your task here."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter className="flex w-full justify-end">
								<Button type="submit">Create task</Button>
							</DialogFooter>
						</form>
					</Form>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
}
