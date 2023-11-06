import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../../../ui/card";
import TaskOptions from "./task-options";

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
							<TaskOptions taskId={task.task_id} />
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
