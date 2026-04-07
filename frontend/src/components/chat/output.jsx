import { useEffect, useRef } from "react";

export default function Output({ output, loading }) {
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [output]);

	return (
		<div className="md:w-[70%] sm:w-full h-full flex flex-col gap-2">
			<div className="w-full flex flex-col md:gap-4 sm:gap-2">
				{output.map((i, index) => (
					<div key={index} className="w-full overflow-hidden">
						<pre
							className={`font-sans px-2 md:px-3 p-1 ${
								i.role == "user" ? "text-sm max-w-[60%] text-wrap overflow-auto rounded-lg rounded-tr-xs w-fit ml-auto bg-white/5" : "max-w-[90%] mr-auto mb-10"
							}`}
						>
							{i?.content?.image ? (
								<img
									src={`data:image/jpeg;base64,${i?.content?.image}`}
									alt=""
									className="w-40 h-40 object-cover rounded-lg"
								/>
							) : i?.content?.image_error ? (
								<p className="text-red-400 text-xs">
									{/* Image failed: {i?.content?.image_error} */}
									{/* <div dangerouslySetInnerHTML={{ __html: i?.content?.image_error }} /> */}
								</p>
							) : null}
							<div className="w-fit text-wrap">
								<Content i={i}/>
							</div>
						</pre>
					</div>
				))}
				{loading &&
				<div className="flex flex-row items-center gap-2 w-fit h-fit">
					<div className="p-2 border-2 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-xs">loading...</p>
				</div>
				}
				<div ref={bottomRef}></div>
			</div>
		</div>
	);
}

const Content = function({i}){
	return(
		<div className="w-fit text-wrap">
			{typeof i.content === "string" ? (
				<div>
					{i.content}
				</div>
			) : (
				Object.entries(i.content).map(([key, value], idx) => (
				<div key={idx} className="mb-2">
					<p className="font-semibold">{key} :</p>

					{Array.isArray(value) ? (
						<ul className="list-disc ml-4">
							{value.map((v, i) => (
								<li key={i}>{v}</li>
							))}
						</ul>
					) : (
						<p className="">{value}</p>
					)}
				</div>
				))
			)}
		</div>
	)
}