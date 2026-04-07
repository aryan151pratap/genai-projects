import { useState } from "react";
import { FaHistory } from "react-icons/fa";

export default function History(){

	const handleSubmit = async function(){
		if(!input.trim()) return
		try{
			setLoading(true);
			const res = await fetch(`${API_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			const result = await res.json();
		} catch (err){
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	return(
		<div className={`md:w-[250px] w-[200px] h-full`}>
			<div className="capitalize p-2 flex flex-row gap-2 items-center border-b border-white/20">
				<div className="">
					<FaHistory/>
				</div>
				<div>
					history
				</div>
			</div>
		</div>
	)
}