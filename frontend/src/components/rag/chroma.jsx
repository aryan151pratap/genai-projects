function Chroma({task}) {
	return(
		<div className="w-full h-full flex">
			<div className="flex flex-col gap-1 p-1 bg-black/40 border border-white/20 rounded-md">
				{task.map((i, index) => (
					<div key={index}>
						<div className="px-2 py-1 flex flex-row gap-1 items-center bg-white/10 rounded">
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

export default Chroma;