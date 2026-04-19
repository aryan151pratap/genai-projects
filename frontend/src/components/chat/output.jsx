import { useEffect, useRef, useState } from "react";
import Image_show from "./image";
import Content from "./contet";


export default function Output({ output, loading }) {
	const bottomRef = useRef(null);

	console.log(output);

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
								i.role == "user" ? "max-w-[50%] overflow-auto w-fit ml-auto" : "max-w-[90%] mr-auto mb-10"
							}`}
						>
							<div className="w-full text-wrap">
								{i.role == "bot" ?
									<Content i={i}/>
									:
									<div className="">
										{typeof i?.content === "object" ? (
											<div className="flex flex-col gap-2">
												<Image_show image={i.content.image}/>
												<div className="w-fit ml-auto px-2 p-1 bg-white/5 rounded-lg rounded-tr-xs">
													{i.content.text}
												</div>
											</div>
										)
										:
										<div className="px-2 p-1 bg-white/5 rounded-lg rounded-tr-xs">
											{i.content}
										</div>
									}
								</div>
								}
							</div>
						</pre>
					</div>
				))}
				{loading &&
				<div className="mt-5 flex flex-row items-center gap-2 w-fit h-fit animate-pulse px-2">
					<div className="p-2 border-2 border-t-transparent rounded-full animate-spin"></div>
					<p className="">loading...</p>
				</div>
				}
				<div ref={bottomRef} className="mb-50"></div>
			</div>
		</div>
	);
}
