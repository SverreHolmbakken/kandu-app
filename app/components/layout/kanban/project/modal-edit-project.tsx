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
import { updateProject } from "@/app/utils/supabase-request";
import { ProjectShortType, ProjectType } from "@/Types";

const formSchema = z.object({
	projectName: z.string().min(1).max(30),
	projectDescription: z.string().min(0).max(200),
});

export default function ModalEditProject({
	slug,
	setProjects,
	setOpen,
	projectName,
	projectDescription,
}: {
	slug: string;
	setProjects: (projects: any) => void;
	setOpen: (open: boolean) => void;
	projectName: string;
	projectDescription: string;
}) {
	const { toast } = useToast();
	const { userId, getToken } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		form.setValue("projectName", projectName);
		form.setValue("projectDescription", projectDescription);
	}, [projectName, projectDescription, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const result = formSchema.safeParse(values);
		console.log(values);
		console.log(userId);
		editProject();

		if (result.success) {
			setOpen(false);
		} else {
			setOpen(true);
		}

		try {
			form.reset({
				projectName: "",
				projectDescription: "",
			});
		} catch (error) {
			console.error(error);
			console.log("hei");
		}
	}

	async function editProject() {
		const { projectName, projectDescription } = form.getValues();
		const project: ProjectShortType = {
			name: projectName,
			description: projectDescription,
			slug: slug,
		};
		const token = await getToken({ template: "supabase" });
		const putEditProject = await updateProject({
			token: token ?? "",
			project: project,
		});
		console.log(putEditProject);
		setProjects((current: any[]) =>
			current.map((project) => {
				if (project.slug === slug) {
					return {
						...project,
						name: projectName,
						description: projectDescription,
					};
				} else {
					return project;
				}
			})
		);
		toast({
			title: "Success!",
			description: `${projectName} has been edited!`,
		});
	}

	return (
		<DialogContent>
			<CardHeader>
				<CardTitle>Edit project</CardTitle>
				<CardDescription>
					Edit project name and description.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="projectName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<div className="flex flex-row gap-1">
											Project name{" "}
											<div className="text-xs text-red-400">
												required
											</div>
										</div>
									</FormLabel>
									<FormControl>
										<Input placeholder="project name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="projectDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="describe your project here"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="flex w-full justify-end">
							<Button type="submit">Edit project</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</DialogContent>
	);
}
