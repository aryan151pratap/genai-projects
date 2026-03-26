import Header from "./header";
import Left from "./left";
import Right from "./right";

function App(){
	return(
		<div className="h-[100vh] flex flex-col text-white w-full bg-black overflow-auto">
			<div className="h-[5vh] sticky top-0 rounded bg-white/5">
				<Header/>
			</div>
			<div className="h-[95vh] w-full flex flex-row rounded bg-white/5">
				<div className="max-h-full max-w-50 lg:max-w-60">
					<Left/>
				</div>
				<div className="max-h-full w-full mr-2 mb-2 overflow-auto">
					<Right/>
				</div>

			</div>
		</div>
	)
}

export default App;