import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function Query({task}) {
	const len = task.length-1;
	const [query, setQuery] = useState("");

	return(
		<div className="bg-black/40 p-1 flex flex-col items-center">
			<div className="flex flex-col gap-1 rounded bg-black/50 p-1 border border-white/20 rounded-md">
				{task.slice(0, len).map((i, index) => (
					<div key={index}>
						<div className={`px-2 py-1 flex flex-row gap-1 items-center ${i.color ? "bg-"+i.color+"-400/50 hover:bg-"+i.color+"-500/40" : "bg-white/10"} rounded`}>
							<div>
								{i.icon}
							</div>
							<div>
								{i.name}
							</div>
						</div>
					</div>
				))}
			</div>
			<FaArrowUp className="text-white/30"/>
			<div className="h-10 w-[1px] bg-white/30 ">
			</div>
			<div className="w-full">
				<div className={`px-2 py-1 flex flex-row gap-1 items-center ${task[len].color ? "bg-"+task[len].color+"-400/50 hover:bg-"+task[len].color+"-500/40" : "bg-white/10"} cursor-pointer rounded`}>
					<div>
						{task[len].icon}
					</div>
					<div>
						{task[len].name}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Query;