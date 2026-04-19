export default function Tag({text}){
	return(
		<div className="w-fit h-fit p-2 fixed inset-0">
			<div className="bg-black px-2 p-1 rounded-md">
				<p>{text}</p>
			</div>
		</div>
	)
}