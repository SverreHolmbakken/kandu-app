export const demoData = {
	tasks: {
		"task-1": { id: "task-1", content: "Search for new positions" },
		"task-2": { id: "task-2", content: "Update my resume" },
		"task-3": { id: "task-3", content: "Apply to jobs" },
		"task-4": { id: "task-4", content: "Interview" },
		"task-5": { id: "task-5", content: "Research the company" },
		"task-6": { id: "task-6", content: "Get a job" },
		"task-7": { id: "task-7", content: "Learn new frameworks" },
		"task-8": { id: "task-8", content: "Kill the imposter-syndrome" },
	},
	columns: [
		{
			id: "column-1",
			title: "To do",
			taskIds: ["task-8", "task-7", "task-6"],
		},
		{
			id: "column-2",
			title: "In review",
			taskIds: ["task-1", "task-2"],
		},
		{
			id: "column-3",
			title: "Ongoing",
			taskIds: ["task-3", "task-4", "task-5"],
		},
		{
			id: "column-4",
			title: "Completed",
			taskIds: [],
		},
	],
	// Facilitate reordering of the columns
	columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};
