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
import { useAtom } from "jotai";
import { tasksAtom } from "@/Atoms";
import { TaskType } from "@/Types";

const formSchema = z.object({
	taskTitle: z.string().min(1).max(30),
	taskDescription: z.string().min(1).max(200),
	taskColumn: z.number(),
});

export default function CreateTaskModal({ columnId }: { columnId: number }) {
	const [tasks, setTasks] = useAtom<TaskType[]>(tasksAtom);
	const { toast } = useToast();
	const { userId, getToken } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			taskTitle: "",
			taskDescription: "",
			taskColumn: columnId,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		console.log(userId);
		newTask();
		console.log(tasks);
		setTasks([
			...tasks,
			{
				title: values.taskTitle,
				description: values.taskDescription,
				column_id: columnId,
			},
		]);

		try {
			form.reset({
				taskTitle: "",
				taskDescription: "",
			});
		} catch (error) {
			console.error(error);
		}
	}

	interface Task {
		title: string;
		description: string;
		column_id: number;
	}

	const newTask = async () => {
		const { taskTitle, taskDescription } = form.getValues();
		const task: Task = {
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
	};

	return (
		<Dialog>
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
										<FormLabel>Task name</FormLabel>
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
								<DialogPrimitive.Close asChild>
									<Button
										type="submit"
										onClick={() => {
											toast({
												description: "Your task has been created.",
											});
										}}
									>
										Create task
									</Button>
								</DialogPrimitive.Close>
							</DialogFooter>
						</form>
					</Form>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
}
