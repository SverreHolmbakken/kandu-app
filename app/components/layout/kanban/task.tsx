import React from "react";
import { Edit } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../../ui/card";

export default function Task() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="">
					<div className="flex items-center justify-between text-base">
						<div className="flex items-center">
							<div className="mr-2">Task name</div>
						</div>
						<div className="ml-2">
							<Edit className="w-5 stroke-slate-500" />
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Task description</p>
			</CardContent>
		</Card>
	);
}
