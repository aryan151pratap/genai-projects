import { CiSaveDown2, CiMemoPad, CiLink } from "react-icons/ci";

function Upload(){
	const data = ["chatbot 1", "socket programming", "wepage cse programming", "chat bot-2", "chatbot 3", "chatbot 4", "chatbot 5"];
	
	return(
		<div className="w-full h-full flex flex-col gap-1 p-2 bg-black/40">
			<div className="group capitalize flex flex-row items-center justify-between px-2 p-1 bg-white/5 rounded-md cursor-pointer">
				<div className="flex flex-row gap-1 items-center">
					<CiMemoPad className="w-5 h-5"/>
					<p>upload</p>
				</div>
				<CiSaveDown2 className="w-6 h-6 p-0.5 hover:bg-white/10 rounded"/>
			</div>
			<div className="max-w-50 max-h-25 flex flex-col gap-1 p-1 border border-white/20 rounded-md overflow-auto">
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
		</div>
	)
}

export default Upload;