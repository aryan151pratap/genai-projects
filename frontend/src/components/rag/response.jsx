function Response({task}){
	return(
		<div>
			<div className="flex flex-col gap-1 bg-black/40 p-1 rounded-md border border-white/20">
				{task.map((i, index_1) => (
					<div key={index_1}>
						<div className={`px-2 py-1 flex flex-row gap-1 items-center ${i.color ? "bg-"+i.color+"-300/50" : "bg-white/10"} rounded`}>
							<div>
								{i.icon}
							</div>
							<div>
								{i.name}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Response;