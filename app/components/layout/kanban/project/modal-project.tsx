"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as z from "zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

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
import { postProject } from "@/app/utils/supabase-request";
import { ProjectType } from "@/Types";

const formSchema = z.object({
	projectName: z.string().min(1).max(30),
	projectDescription: z.string().min(0).max(200),
});

export default function ProjectModal({
	setProjects,
	projects,
	setOpen,
}: {
	setProjects: (projects: any) => void;
	projects: ProjectType[];
	setOpen: (open: boolean) => void;
}) {
	const { toast } = useToast();
	const { userId, orgId, getToken } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: "",
			projectDescription: "",
		},
	});

	const date = new Date();

	function onSubmit(values: z.infer<typeof formSchema>) {
		const result = formSchema.safeParse(values);
		console.log(values);
		newProject();

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
		}
	}

	function RandomHexColor() {
		const hexChars = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += hexChars[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	const newProject = async () => {
		const { projectName, projectDescription } = form.getValues();
		function accessId() {
			if (!orgId) {
				return userId;
			} else {
				return orgId;
			}
		}
		const project: ProjectType = {
			name: projectName,
			description: projectDescription,
			accessed_by: accessId(),
			owner_id: userId ?? "",
			card_color: RandomHexColor(),
			slug: uuidv4(),
			created_at: date.toISOString(),
		};
		const token = await getToken({ template: "supabase" });
		const postNewProject = await postProject({
			token: token ?? "",
			project: project,
			userId: accessId(),
		});
		setProjects([...projects, project]);
		toast({
			title: "Success!",
			description: `${projectName} has been created`,
		});
	};

	return (
		<DialogContent>
			<CardHeader>
				<CardTitle>New project</CardTitle>
				<CardDescription>Create a new project.</CardDescription>
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
										{" "}
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
							<Button type="submit">Create project</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</DialogContent>
	);
}
