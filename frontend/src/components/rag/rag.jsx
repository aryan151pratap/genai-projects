import {
  CiFolderOn,
  CiDatabase,
  CiSearch,
  CiViewList,
  CiText,
  CiChat1,
  CiSettings,
  CiCircleQuestion,
  CiStreamOn,
  CiSquareChevDown
} from "react-icons/ci";
import Upload from "./upload";
import { useState } from "react";
import Chroma from "./chroma";
import Query from "./query";

const pipeline = [
	{ name: "documents upload", icon: <CiFolderOn className="w-5 h-5"/> },
	[
		{ name: "text chunking", icon: <CiStreamOn className="w-5 h-5"/> },
		{ name: "embeddings generation", icon: <CiSettings className="w-5 h-5"/> }
	],
	[
		{ name: "store in vector DB", icon: <CiDatabase className="w-5 h-5"/> },
		{ name: "query embedding", icon: <CiSettings className="w-5 h-5"/> },
		{ name: "user query", icon: <CiChat1 className="w-5 h-5"/> }
	],
	[
		{ name: "similarity search", icon: <CiSearch className="w-5 h-5"/> },
		{ name: "retrieve context", icon: <CiViewList className="w-5 h-5"/> }
	],
	{ name: "prompt construction", icon: <CiText className="w-5 h-5"/> },
	{ name: "LLM response", icon: <CiCircleQuestion className="w-5 h-5"/> }
];

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
			<div className="py-5 text-white text-lg mb-4 flex flex-row items-center gap-2">
				<p className="font-bold">Rag</p>
				<p className="font-semibold">( Retrieval-Augmented Generation )</p>
			</div>
			<div className="w-full flex flex-wrap items-center overflow-auto">
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
												<div className="px-2 py-1 flex flex-row gap-1 items-center bg-white/10 rounded">
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
							: 
								<div className="capitalize flex flex-row items-center gap-1 bg-white/10 px-3 py-1 cursor-pointer"
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
						{index !== pipeline.length - 1 && (
							<div className={`w-6 h-[3px] bg-white/30`}></div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Rag;