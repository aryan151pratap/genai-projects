import { useEffect, useState } from "react";
import Sign from "./components/login/sign";
import Header from "./header";
import Left from "./left";
import Right from "./right";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App(){
	const [signin, setSignin] = useState(false);
	const [data, setData] = useState({email: "", pass: "", name: ""});

	const get_data = function(name){
		return localStorage.getItem(name);
	}
	useEffect(() => {
		const signin = function(){
			const name = get_data("chat_name");
			const email = get_data("chat_email");
			const user_id = get_data("user_id");
			console.log(name, email, user_id);
			if(!name || !email || !user_id){
				setSignin(true);
			}
			else {
				setData({name, email, user_id});
			}
		}
		signin();
	}, [])
	
	return(
		<BrowserRouter>
			{signin &&
				<Routes>
					<Route path="/signup" element={<Sign data={data} setData={setData} setSignin={setSignin}/>} />
				</Routes>
			}
			<div className="h-[100vh] flex flex-col text-white w-full bg-black overflow-auto">
				
				<div className="h-[5vh] sticky top-0 rounded bg-white/5">
					<Header data={data}/>
				</div>
				<div className="h-[95vh] w-full flex flex-row rounded bg-white/5">
					<div className="max-h-full">
						<Left/>
					</div>
					<div className="max-h-full w-full mr-2 mb-2 overflow-auto">
						<Right user={data}/>
					</div>

				</div>
			</div>
		</BrowserRouter>
	)
}

export default App;