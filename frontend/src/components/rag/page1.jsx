import Upload from "./upload";
import { useState } from "react";
import Chroma from "./chroma";
import Query from "./query";

import pipeline from "./pipeline";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";
import Note from "./note";


function Page1(){

	const [currTask, setCurrTask] = useState(["documents upload"]);
	const handleTask = function(i){
		const find = currTask.some((e) => e == i);
		if(find){
			setCurrTask(currTask.filter((e) => e != i));
		} else {
			setCurrTask(e => [...e, i]);
		}
	}

	return(
		<div className="w-full p-2 sm:p-4 md:p-6 overflow-auto">
			<div className="w-full flex flex-row">
				{pipeline.map((i, index) => (
					<div key={index} className="shrink-0 flex items-center py-1">
						<div className="">
							{index !== 0 && (
								<div className="flex flex-row items-center">
									<div className={`w-3 h-[1px] bg-white/30`}>
									</div>
									<div className="flex flex-col text-white/30">
										<FaArrowRight className=""/>
									</div>
								</div>
							)}
						</div>

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
									<Chroma task={i}/>
								</div>
							: index == 4 ?
								<div>
									<Chroma task={i}/>
								</div>
							:
								<div className={`capitalize flex flex-row items-center gap-1 ${i.color ? "bg-"+i.color+"-500/50 hover:bg-"+i.color+"-500/40" : "bg-white/10"} px-3 py-1 cursor-pointer`}
									onClick={() => handleTask(i.name)}
								>
									<div className="">
										{i.icon}
									</div>
									<p>{i.name}</p>
									<div className="pl-2">
										{currTask.some((e) => e == i.name) ?
											<CiSquareChevDown className="w-5 h-5"/>
											:
											<CiSquareChevUp className="w-5 h-5"/>
										}
									</div>
								</div>
							}
							{currTask.some((e) => e == i.name) && i.name == "documents upload" &&
								<div className="w-full">
									<Upload/>
								</div>
							}
						</div>
						
					</div>
				))}
			</div>
		</div>
	)
}

export default Page1;