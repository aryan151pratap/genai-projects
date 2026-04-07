import { FaUser } from "react-icons/fa";

function Header({data}){
	return(
		<div className="h-fit w-full flex flex-row gap-2 p-1">
			<div className="ml-auto flex flex-row gap-2 px-2">
				<div className="w-fit p-1 bg-white/15 rounded border border-white/10">
					<FaUser/>
				</div>
				<div className="text-sm">
					<p>{data?.name}</p>
					<p>{data?.user_id}</p>
				</div>
				</div>
		</div>
	)
}

export default Header;