import Rag from "./rag";

function Page1(){
	return(
		<div className="flex flex-col gap-2">
			<div className="border-b border-white/10 p-4 px-8 text-white text-lg flex flex-row items-center gap-2">
				<p className="text-2xl font-bold">Rag</p>
				<p className="font-semibold">( Retrieval-Augmented Generation )</p>
			</div> 
			<div className="p-4 w-full">
				<div className="border border-white/10 rounded-md overflow-hidden">
					<div className="border-b border-white/10 p-2 px-4 font-semibold bg-white/5">
						<p className="">Workflow</p>
					</div>
					<div className=" bg-black/15">
						<Rag/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page1;