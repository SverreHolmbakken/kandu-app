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
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { Input } from "@/app/components/ui/input";
import {
	Form,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormControl,
} from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { updateTask } from "@/app/utils/supabase-request";
import { TaskShortType, TaskType } from "@/Types";

const formSchema = z.object({
	taskName: z.string().min(1).max(30),
	taskDescription: z.string().min(0).max(200),
});

export default function ModalEditTask({
	taskId,
	setTasks,
	setOpenDialog,
	setOpenDropdown,
	taskName,
	taskDescription,
}: {
	taskId: string;
	setTasks: (tasks: any) => void;
	setOpenDialog: (open: boolean) => void;
	setOpenDropdown: (open: boolean) => void;
	taskName: string;
	taskDescription: string;
}) {
	const { toast } = useToast();
	const { userId, getToken } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		form.setValue("taskName", taskName);
		form.setValue("taskDescription", taskDescription);
	}, [taskName, taskDescription, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const result = formSchema.safeParse(values);
		console.log(values);
		console.log(userId);
		editProject();

		if (result.success) {
			setOpenDialog(false);
			setOpenDropdown(false);
		} else {
			setOpenDialog(true);
		}

		try {
			form.reset({
				taskName: "",
				taskDescription: "",
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function editProject() {
		const { taskName, taskDescription } = form.getValues();
		const task: TaskShortType = {
			name: taskName,
			description: taskDescription,
			task_id: taskId,
		};
		const token = await getToken({ template: "supabase" });
		const putEditTask = await updateTask({
			token: token ?? "",
			task: task,
		});
		setTasks((current: any[]) =>
			current.map((task) => {
				if (task.task_id === taskId) {
					return {
						...task,
						title: taskName,
						description: taskDescription,
					};
				} else {
					return task;
				}
			})
		);
		toast({
			title: "Success!",
			description: `${taskName} has been edited!`,
		});
	}

	return (
		<DialogContent>
			<CardHeader>
				<CardTitle>Edit task</CardTitle>
				<CardDescription>Edit task name and description.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="taskName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
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
											placeholder="give your task a description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="flex w-full justify-end">
							<Button type="submit">Edit task</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</DialogContent>
	);
}
