import { useEffect, useRef, useState } from "react";
import { CiImport, CiTurnL1 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Output from "./output";
import Image from "./image";
import Files from "./files";

const API_URL = import.meta.env.VITE_API_URL;

function Bot(){
	const [suggest, setSuggest] = useState([
		{ label: "Generate Image", value: "generate_image" },
		{ label: "Debug Code", value: "debug_code" },
		{ label: "Fix Error", value: "fix_error" },
		{ label: "Write Code", value: "write_code" },
		{ label: "Explain Code", value: "explain_code" },
		{ label: "Optimize Code", value: "optimize_code" },
		{ label: "Summarize Text", value: "summarize_text" },
	]);
	const [input, setInput] = useState("");
	const [down, setDown] = useState(false);
	const [role, setRole] = useState();
	const [output, setOutput] = useState([]);
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState(false);
	const textareaRef = useRef(null);

	useEffect(() => {
		const el = textareaRef.current;
		if (el) {
			el.style.height = "auto";
			el.style.height = el.scrollHeight + "px";
		}
		if(output.length > 0){
			setDown(true);
		}
	}, [input]);

	useEffect(() => {
		if(suggest.length == 0) return;
		setRole(suggest[0]);
	}, [])

	const handleSubmit = async function(){
		if(!input.trim()) return
		try{
			setLoading(true);
			const user = {role: "user", content: input};
			setOutput(e => [...e, user]);
			setInput("");
			const formData = new FormData();

			formData.append("role", user.role);
			formData.append("content", user.content)
			formData.append("action", role.value);
			image.forEach(file => {
				formData.append("files", file);
			});
			setImage([]);
			const res = await fetch(`${API_URL}/bot`, {
				method: "POST",
				// headers: {
				// 	"Content-Type": "application/json"
				// },
				body: formData
			})
			const result = await res.json();
			if(res.ok){
				console.log(result);
				setOutput(e => [...e, result]);
			}
		} catch (err){
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	const handlePaste = (e) => {
		const items = e.clipboardData.items;

		for (let item of items) {
			if (item.type.startsWith("image")) {
				const file = item.getAsFile();
				console.log(file);
				const reader = new FileReader();

				reader.onload = () => {
					setImage(e => [...e, {name: file.name, image: reader.result, size: file.size}]);
				};

				reader.readAsDataURL(file);
			}
		}
	};

	
	return(
		<div className="h-full flex flex-col overflow-auto">
			<div className="p-4 sticky top-0 text-xl font-semibold">
				Assistant
			</div>

			{output.length > 0 &&
				<div className="w-full p-4 flex justify-center overflow-auto">
					<Output output={output} loading={loading}/>
				</div>
			}

			<div className={`px-4 sticky inset-0 w-full mt-auto flex flex-col gap-2 items-center justify-center
				${down ? "h-fit" : "h-full"} 
				transition-all duration-500`}>
				<div className={`p-2 rounded md:backdrop-blur-xs sm:backdrop-blur-md md:w-[75%] duration-500 flex justify-center`}>
					<div className={`mb-4 md:w-[90%] flex ${down ? "md:flex-row items-end" : "items-center"} flex-col md:gap-3 gap-2 justify-center`}>

						<div className={`${down ? "w-full" : "w-fit"} flex flex-row items-center justify-center gap-2`}>
							<div className="w-full items-center flex flex-col">
								{role &&
									<div className="mr-auto group w-fit bg-white/5 overflow-hidden border border-white/20 rounded-bl-xs rounded-lg flex flex-row text-xs">
										<div className="p-1 px-2 bg-white/10">Role</div>
										<div className="p-1 px-2">
											<p>{role?.label}</p>
										</div>
										<div className="p-1 hidden group-hover:flex items-center hover:bg-white/10 cursor-pointer"
											onClick={() => setRole("")}
											>
											<FaTimes/>
										</div>
									</div>
								}
								<div className={`w-full ${role ? "rounded-tl" : ""} flex flex-col items-center rounded-2xl transition duration-300 border-white/20 border-1 focus-within:border-white/60 bg-black/80 text-white overflow-auto`}>

									{image.length > 0 &&
										<div className="w-full max-h-50 overflow-auto">
											<Image image={image} setImage={setImage}/>
										</div>
									}

									<div className="w-full flex flex-row">
										<textarea
											rows={1}
											value={input}
											onChange={(e) => setInput(e.target.value)}
											ref={textareaRef}
											onPaste={handlePaste}
											onKeyDown={(e) => {
												if (e.key === "Enter" && !e.shiftKey && !loading) {
													e.preventDefault();
													handleSubmit();
												}
											}}
											className={`w-full max-h-50 min-h-fit p-3 outline-none resize-none transition`}
											placeholder="Ask your AI..."
										></textarea>

										<div className="mt-auto w-fit flex flex flex-col items-end relative p-1">
											<div className="w-fit p-1 bg-white/10 rounded rounded-br-xl hover:bg-white/15 cursor-pointer border-1 border-white/15 hover:border-white/20 transition durstion-300"
												onClick={() => setFiles(true)}
											>
												<CiImport/>
											</div>
											{files &&
												<div className="p-2 md:w-[200px] sm:w-[200px] w-[150px] absolute z-100 inset-0 top-auto left-auto">
													<Files setOpen={setFiles} setMedia={setImage}/>
												</div>
											}
										</div>
									</div>
								</div>

							</div>				
							<button className={`p-2 h-fit w-fit text-black rounded-lg ${loading ? "bg-white/70 cursor-not-allowed" : "bg-white/90 hover:bg-white/80 focus:bg-white/60 cursor-pointer"}`}
								onClick={() => handleSubmit()}
								disabled={loading}
							>
								<CiTurnL1 className="h-6 w-6"/>
							</button>
						</div>
						<div className={`${down ? "md:max-w-full" : "sm:max-w-[500px]"} flex flex-wrap gap-1 justify-center`}>
							{suggest.map((i, index) => (
								<div key={index} className="bg-white/10 rounded-lg px-2 py-1 text-xs hover:bg-white/20 cursor-pointer"
									onClick={() => setRole(i)}
								>
									<p>{i.label}</p>
								</div>
							))}
						</div>

					</div>
				</div>

			</div>
		</div>
	)
}

export default Bot;