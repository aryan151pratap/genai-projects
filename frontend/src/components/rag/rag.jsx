import Upload from "./upload";
import { useState } from "react";
import Chroma from "./chroma";
import Query from "./query";
import Response from "./response";

import pipeline from "./pipeline";
import { CiSquareChevDown } from "react-icons/ci";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";


function Rag(){

	const [currTask, setCurrTask] = useState(["documents upload"]);
	const handleTask = function(i){
		const find = currTask.some((e) => e == i);
		console.log(find);
		if(find){
			setCurrTask(currTask.filter((e) => e != i));
		} else {
			setCurrTask(e => [...e, i]);
		}
	}

	return(
		<div className="w-full overflow-auto p-2 sm:p-4 md:p-6">
			<div className="w-full flex flex-wrap items-center justify-center overflow-auto">
				{pipeline.map((i, index) => (
					<div key={index} className="flex items-center py-1">
						<div className="rounded-md overflow-hidden">
							{index == 1 ?
								<div>
									<Chroma task={i}/>
								</div>
							: index == 2?
								<div>
									<Query task={i}/>
								</div>
							: index == 3?
								<div>
									<div className="flex flex-col gap-1 bg-black/40 p-1 rounded-md border border-white/20">
										{i.map((j, index_1) => (
											<div key={index_1}>
												<div className={`px-2 py-1 flex flex-row gap-1 items-center ${j.color ? "bg-"+j.color+"-500/50" : "bg-white/10"} rounded`}>
													<div>
														{j.icon}
													</div>
													<div>
														{j.name}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							: index == 4 ?
								<div>
									<Response task={i}/>
								</div>
							:
								<div className={`capitalize flex flex-row items-center gap-1 ${i.color ? "bg-"+i.color+"-500/50" : "bg-white/10"} px-3 py-1 cursor-pointer`}
									onClick={() => handleTask(i.name)}
								>
									<div className="">
										{i.icon}
									</div>
									<p>{i.name}</p>
									<div className="pl-2">
										<CiSquareChevDown className="w-5 h-5"/>
									</div>
								</div>
							}
							{currTask.some((e) => e == i.name) && i.name == "documents upload" &&
								<div className="w-full">
									<Upload/>
								</div>
							}
						</div>
						<div className="">
							{index !== pipeline.length - 1 && (
								<div className="flex flex-row items-center">
									<div className={`w-3 h-[1px] bg-white/30`}>
									</div>
									<div className="flex flex-col text-white/30">
										<FaArrowRight className=""/>
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Rag;