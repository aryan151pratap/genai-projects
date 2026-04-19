import { CiGrid31 } from "react-icons/ci";
import Bot from "./bot";
import History from "./history";
import { useEffect, useState } from "react";

export default function Assistant({user}){
	const [open, setOpen] = useState(false);
	const [chatId, setChatId] = useState("");
	const [curr_chatId, setCurr_chatId] = useState("");

	const save_chat_id = function(){
		const id = "chat_" + Date.now()
		localStorage.setItem("chat_id", id);
		setChatId(id);
	}
	useEffect(() => {
		let id = localStorage.getItem("chat_id");
		if(!id) id = save_chat_id();
		else setChatId(id);
	}, [])

	return(
		<div className="w-full h-full flex flex-col">
			<div className="px-4 p-2 stick inset-0y flex flex-row items-center top-0 text-xl font-semibold">
				<p>Assistant</p>
				<p className="ml-auto text-sm font-thin bg-black/40 px-2 p-1 rounded">{chatId}</p>
				<button className="font-thin ml-2 text-sm px-2 p-1 bg-white/10 hover:bg-white/20 rounded cursor-pointer"
					onClick={() => save_chat_id()}
				>
					+ new
				</button>
			</div>
			<div className="h-full w-full flex flex-row overflow-auto">
				<div className={`w-fit h-full flex flex-col rounded-t ${open && "bg-black/20"}`}>
					{open &&
						<History user={user} chatId={chatId} setChatId={setChatId}/>
					}
					<div className="p-1 mt-auto">
						<CiGrid31 className="bg-white/10 hover:bg-white/20 p-1 h-6 w-6 rounded cursor-pointer"
							onClick={() => setOpen(e => !e)}
						/>
					</div>
				</div>
				<div className="w-full h-full">
					<Bot chatId={chatId} user_data={user}/>
				</div>
			</div>
		</div>
	)
}