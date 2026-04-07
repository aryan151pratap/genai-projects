import { useState } from "react";
import { CiSaveDown2, CiMemoPad, CiLink, CiClock2 } from "react-icons/ci";
import Files from "../chat/files";

const API_URL = import.meta.env.VITE_API_URL;

function Upload(){
	const [data, setData] = useState(["chatbot 1", "socket programming", "wepage cse programming", "chat bot-2", "chatbot 3", "chatbot 4", "chatbot 5"]);
	const [show, setShow] = useState(false);
	const [upload, setUpload] = useState(false);
	const [file, setFiles] = useState([]);
	const [input, setInput] = useState(""); 

	const handleSubmit = async function(){
		try{
			if(file.length == 0) return;
			const formData = new FormData();
			formData.append("name", input);
			file.forEach(file => {
				formData.append("files", file);
			});
			const res = await fetch(`${API_URL}/rag-data`, {
				method: "POST",
				body: formData
			})
			const result = await res.json();
			if(res.ok){
				console.log(result);
				const name = file.filter((i) => i.name);
				setData(e => [...e, ...name]);
				setFiles([]);
				setInput("");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return(
		<div className="w-full h-full flex flex-col gap-1 p-2 bg-black/40">
			{file.length > 0 &&
			<div className="max-w-50 flex flex-col bg-white/1 rounded-sm p-1 gap-1 border border-white/40 overflow-auto">
				<div className="flex flex-row gap-2 items-center">
					<div className="w-fit">
						<input type="text" value={input} 
							placeholder="Enter name..."
							onChange={(e) => setInput(e.target.value)}
							className="w-full outline-none border border-white/10 rounded-md px-2 p-1"
						/>
					</div>
					<button className="w-fit ml-auto px-2 p-1 bg-blue-300/30 hover:bg-blue-400/50 focus:bg-blue-400/40 rounded cursor-pointer"
						onClick={() => handleSubmit()}
					>
						submit
					</button>
				</div>
				<div className="flex flex-col max-h-40 gap-1 overflow-y-auto">
					{file.map((i, index) => (
						<div key={index} className="w-full">
							<div className={`w-full p-1 rounded border ${i.name.split(".")[1] == "txt" ? "bg-white/10 px-1.5 border-white/10" : "bg-blue-500/20 border-blue-400/30"}`}>
								<div className="shrink-0 flex flex-row gap-1">
									<span>{index+1}. </span>
									<span className="line-clamp-1">{i.name}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			}
			<div className="group capitalize flex flex-row items-center justify-between px-2 p-1 bg-white/5 rounded-md cursor-pointer">
				<div className="flex flex-row gap-1 items-center">
					<CiMemoPad className="w-5 h-5"/>
					<p>upload</p>
				</div>
				<div className="h-full">
					<CiSaveDown2 className="w-6 h-6 p-0.5 hover:bg-white/10 rounded"
						onClick={() => setUpload(e => !e)}
					/>
					{upload &&
						<div className="absolute top-0 w-fit h-fit">
							<Files setOpen={setUpload} media={file} setMedia={setFiles}/>
						</div>
					}
				</div>
			</div>
			<div className="max-w-50 max-h-25 flex flex-col gap-1 border border-white/20 rounded-md overflow-auto">
				<div className="p-1 px-2 flex flex-row gap-2 items-center bg-white/10 rounded-t-md cursor-pointer"
					onClick={() => setShow(e => !e)}
				>
					<div>
						<CiClock2 className="h-5 w-5"/>
					</div>
					<p>history</p>
					<div>
						
					</div>
				</div>
				{show &&
				<div className="ml-1 mr-1 flex flex-col text-sm gap-1 overflow-auto">
					{data.map((i, index) => (
						<div key={index}>
							<div className="flex flex-row items-center gap-1 px-2 py-0.5 bg-white/5 hover:bg-white/10 rounded-md cursor-pointer transition duration-300">
								<div className="rotate-30">
									<CiLink/>
								</div>
								<p className="line-clamp-1">{i}</p>
							</div>
						</div>
					))}
				</div>
				}
			</div>
		</div>
	)
}

export default Upload;