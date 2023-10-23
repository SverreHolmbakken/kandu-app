import React from "react";
import DemoTask from "./demo-task";
import { Separator } from "@/app/components/ui/separator";

interface Task {
	id: string;
	content: string;
}

interface Column {
	id: string;
	title: string;
	taskIds: string[];
}

interface DemoColumnProps {
	column: Column;
	tasks: { [taskId: string]: Task };
}

const DemoColumn: React.FC<DemoColumnProps> = ({ column, tasks }) => {
	const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

	return (
		<div className="h-full w-1/4 border rounded-lg p-4">
			<div>{column.title}</div>
			<Separator className="my-2" />
			{columnTasks.map((task) => (
				<DemoTask
					key={task.id}
					taskId={task.id}
					taskContent={task.content}
				/>
			))}
		</div>
	);
};

export default DemoColumn;
