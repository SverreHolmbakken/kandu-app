import { Fragment } from "react";

import ProjectNav from "../components/layout/project-nav";
import KanbanLayout from "../components/layout/kanban-layout";

export default function Project() {
	return (
		<Fragment>
			<ProjectNav />
			<KanbanLayout />
		</Fragment>
	);
}
