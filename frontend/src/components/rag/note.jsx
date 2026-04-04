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
	return(
		<div className="w-full py-2">
			<div className="text-sm w-full p-1 bg-black/40 rounded-md flex flex-col">
				<div className="w-full">
					<div className="bg-blue-500/30 px-2 p-1 rounded-md">
						Pipeline
					</div>
				</div>
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
			</div>
		</div>
	)
}

export default Note;