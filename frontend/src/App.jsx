import { useEffect, useState } from "react";
import Sign from "./components/login/sign";
import Header from "./header";
import Left from "./left";
import Right from "./right";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App(){
	const [data, setData] = useState({email: "", pass: "", name: ""});

	const get_data = function(name){
		return localStorage.getItem(name);
	}
	useEffect(() => {
		const signin = function(){
			if(get_data("name") && get_data("email")){
				setData((e) => ({...e, user_id: get_data("user_id")}));
			}
			else setData(null);
		}
		signin();
	}, [])
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Sign data={data} setData={setData}/>} />
			</Routes>
			<div className="h-[100vh] flex flex-col text-white w-full bg-black overflow-auto">
				
				<div className="h-[5vh] sticky top-0 rounded bg-white/5">
					<Header data={data}/>
				</div>
				<div className="h-[95vh] w-full flex flex-row rounded bg-white/5">
					<div className="max-h-full max-w-50 lg:max-w-60">
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