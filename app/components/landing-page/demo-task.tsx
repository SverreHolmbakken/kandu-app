import React from "react";

interface DemoTaskProps {
	taskId: string;
	taskContent: string;
}

const DemoTask = ({ taskId, taskContent }: DemoTaskProps) => {
	return (
		<div key={taskId} className="border p-2 rounded my-2 h-28">
			{taskContent}
		</div>
	);
};

export default DemoTask;
