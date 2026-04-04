import { Route, Routes } from "react-router-dom";
import Bot from "./components/chat/bot";
import Home from "./components/home/home";
import Rag from "./components/rag/rag";

function Right(){
	return(
		<div className="h-full w-full bg-white/5 rounded-md overflow-auto">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/chat" element={<Bot />} />
				<Route path="/rag" element={<Rag />} />
			</Routes>
		</div>
	)
}

export default Right;