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

const formSchema = z.object({
	taskname: z.string().min(1).max(30),
	taskdescription: z.string().min(1).max(200),
});

export default function TaskModal() {
	const { toast } = useToast();
	const userId = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			taskname: "",
			taskdescription: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		console.log(userId);

		try {
			form.reset({
				taskname: "",
				taskdescription: "",
			});
		} catch (error) {
			console.error(error);
		}
	}

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
								name="taskname"
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
								name="taskdescription"
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
