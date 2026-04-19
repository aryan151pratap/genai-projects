import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;

export default function Sign({data, setData, setSignin}){
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [login , setLogin] = useState(true);

	const save_data = function(name, value){
		localStorage.setItem(name, value);
	}

	const handleSubmit = async function(){
		try{
			setLoading(true);
			const res = await fetch(`${API_URL}/${login ? "login" : "signin"}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			const result = await res.json();
			if(res.ok){
				console.log(result);
				save_data("chat_email", data.email);
				save_data("chat_name", data.name);
				save_data("user_id", result.user_id);
				setData((e) => ({...e, user_id: result.user_id}));
				setSignin(false);
			} else {
				setMessage(result.message);
			}
		} catch (err){
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	return(
		<div className="w-full h-full fixed z-50 backdrop-blur-xs flex items-center justify-center p-2">
			<div className="md:text-lg text-sm text-white flex flex-col gap-2 bg-black p-4 rounded">
				<div>
					<button className="px-2 p-1 bg-white/20 hover:bg-white/30 rounded cursor-pointer
					capitalize text-sm
					"
						onClick={() => setLogin(e => !e)}
					>
						{login ? "sign up" : "login"} 
					</button>
				</div>
				<div className="">
					<input type="text"
						required
						value={data?.email}
						onChange={(e) => setData((item) => ({...item, email: e.target.value}))}
						className="rounded outline-none bg-black/20 px-2 p-1 border border-white/20 focus:border-white/30"
						placeholder="Enter your email..."
					/>
				</div>
				{login &&
				<div className="">
					<input type="text" 
						value={data?.name}
						required
						onChange={(e) => setData((item) => ({...item, name: e.target.value}))}
						className="rounded outline-none bg-black/20 px-2 p-1 border border-white/20 focus:border-white/30"
						placeholder="Enter your name..."
					/>
				</div>
				}
				<div>
					<input type="password" 
						value={data?.pass}
						required
						onChange={(e) => setData((item) => ({...item, pass: e.target.value}))}
						className="rounded outline-none bg-black/20 px-2 p-1 border border-white/20 focus:border-white/30"
						placeholder="Enter passsword..."
					/>
				</div>
				<div>
					{!loading ?
						<button className="px-2 p-1 bg-blue-300/40 hover:bg-blue-400/50 focus:bg-blue-400/40 text-sm rounded"
							onClick={() => handleSubmit()}
						>
							submit
						</button>
						:
						<div className="px-2 flex flex-row gap-2 items-center">
							<div className="w-fit p-1.5 border-2 rounded-full border-t-transparent animate-spin"></div>
							loading
						</div>
					}
				</div>
				{message &&
				<div className="px-2 p-1 flex items-center bg-white/10 rounded">
					<div className="text-red-400 text-sm">
						{message}
					</div>
				</div>
				}
			</div>
		</div>
	)
}