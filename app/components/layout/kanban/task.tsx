import { Edit } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../../ui/card";

export type TaskProps = {
	task: any;
	id?: number;
	title?: string;
	description?: string;
};

export default function Task({ task }: TaskProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="">
					<div className="flex items-center justify-between text-base">
						<div className="flex items-center">
							<div className="mr-2">{task.title}</div>
						</div>
						<div className="ml-2">
							<Edit className="w-5 stroke-slate-500" />
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{task.description}</p>
			</CardContent>
		</Card>
	);
}
