import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Input(){
	const [input, setInput] = useState("");
	const handleSubmit = async function(){
		try{
			if(input.trim() == "") return;

		} catch (err) {
			console.log(err);
		}
	}
	return(
		<div className="w-full h-full flex flex-col p-2 bg-white/5 rounded-md">
			<div className="w-fit flex flex-col mt-auto bg-black/90 border border-white/20 focus-within:border-white/50 rounded-md overflow-auto">
				<textarea type="text"
					rows={1}
					placeholder="Enter Prompt"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="p-2 mt-auto max-h-40 min-h-fit outline-none resize-none transition" 
				/>
			</div>
		</div>
	)
}