import { use, useState } from "react";

const data = [
  "Data Ingestion",
  "Data Cleaning & Chunking",
  "Embedding Generation",
  "Store in Vector Database",
  "User Query → Embedding",
  "Similarity Search (Top-K retrieval)",
  "Context Augmentation",
  "LLM Response Generation"
];

const Note = function(){
	const [open, setOpen] = useState(false);
	return(
		<div className="w-full py-2">
			
			<div className={`text-sm ${open ? "w-full" : "w-fit"} border border-white/15 p-1 bg-black/40 rounded-md flex flex-col`}>
				<div className={`w-full`}>
					<div className="font-mono bg-blue-500/30 hover:bg-blue-500/40 px-2 p-1 rounded-md flex flex-row gap-1 cursor-pointer"
						onClick={() => setOpen(e => !e)}
					>
						<span className="">RAG</span> 
						<span className="font-semibold">Pipeline</span>
					</div>
				</div>
				{open &&
				<div className="p-2">
					{data.map((i, index) => (
						<div key={index}>
							<div className="flex flex-row items-center gap-1">
								<p>{index+1}</p>-
								<p>{i}</p>
							</div>
						</div>
					))}
				</div>
				}
			</div>
		</div>
	)
}

export default Note;