import Note from "./note";
import Page1 from "./page1";

function Rag(){
	return(
		<div className="w-full h-full flex flex-col">
			<div className="border-b border-white/10 p-4 px-8 text-white text-lg flex flex-row items-center gap-2">
				<p className="text-2xl font-bold">Rag</p>
				<p className="font-semibold">( Retrieval-Augmented Generation )</p>
			</div> 
			<div className="p-4 w-full h-full">
				<div className="w-full rounded-md overflow-hidden">
					<div className="p-2 px-4 font-semibold">
						<p className="">Workflow</p>
					</div>
					<div className="flex md:flex-row flex-col sm:text-xs bg-black/15">
						<div className="md:order-1 shrink-0 md:w-fit w-full h-full p-2">
							<Note/>
						</div>
						<div className="w-full px-2">
							<Page1/>
						</div>
					</div>
				</div>

			</div>
			
		</div>
	)
}

export default Rag;