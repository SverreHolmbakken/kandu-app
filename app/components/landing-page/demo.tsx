import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DemoColumn from "./demo-column";
import { demoData } from "./demo-data";

const Demo = () => {
	const columns = demoData.columns;
	const tasks = demoData.tasks;

	const [ref, inView] = useInView({
		threshold: 1,
		triggerOnce: false,
	});

	const variants = {
		visible: { opacity: 1, scale: 1 },
		hidden: { opacity: 0, scale: 0.65 },
	};

	return (
		<section className="grid h-screen mt-28">
			<div className="justify-self-end text-right mr-20">
				<span className="text-4xl font-bold ">
					Organize and plan your project with your team
				</span>
				<p className="text-l text-zinc-700">
					Create tasks and drag them across your board as you progress.
				</p>
			</div>
			<motion.div
				className="justify-self-center flex flex-row p-5 space-x-5 w-[80vw] h-[60vh] border shadow-xl rounded-xl bg-white dark:bg-slate-700 dark:border-slate-700/50 dark:shadow-2xl"
				animate={inView ? "visible" : "hidden"}
				variants={variants}
				exit="hidden"
				transition={{ duration: 0.5 }}
				ref={ref}
			>
				{columns.map((column) => (
					<DemoColumn key={column.id} column={column} tasks={tasks} />
				))}
			</motion.div>
		</section>
	);
};

export default Demo;
