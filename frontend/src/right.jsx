import { Route, Routes } from "react-router-dom";
import Bot from "./components/chat/bot";
import Home from "./components/home/home";
import Rag from "./components/rag/rag";
import Sign from "./components/login/sign";
import Assistant from "./components/chat/assistant";

function Right({user}){
	return(
		<div className="h-full w-full bg-white/5 rounded-md overflow-auto">
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/chat" element={<Assistant user={user}/>} />
				<Route path="/rag" element={<Rag user={user}/>} />
			</Routes>
		</div>
	)
}

export default Right;