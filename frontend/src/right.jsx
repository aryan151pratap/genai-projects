import Flow from "./components/rag-flow/flow";
import Rag from "./components/rag/rag";

function Right(){
	return(
		<div className="h-full w-full bg-white/5 rounded-md overflow-auto">
			<Rag/>
			<Flow/>
		</div>
	)
}

export default Right;