import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaCopy, FaTimes } from "react-icons/fa";

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
							<div className="w-full text-wrap">
								<Content i={i}/>
							</div>
						</pre>
					</div>
				))}
				{!loading &&
				<div className="flex flex-row items-center gap-2 w-fit h-fit animate-pulse px-2">
					<div className="p-2 border-2 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-xs">loading...</p>
				</div>
				}
				<div ref={bottomRef} className="mb-50"></div>
			</div>
		</div>
	);
}

const Content = ({ i }) => {
	const [open, setOpen] = useState(false);
	const content = i?.content;

	if (typeof content === "string") {
		return <div className="w-fit text-wrap">{content}</div>;
	}

	if (typeof content === "object" && content !== null) {
		return (
			<div className="w-full text-wrap space-y-2">
				
				{content.image && (
					<div className="w-full h-fullp-2">
						<div className="w-full ml-auto sm:max-w-80 sm:h-80 relative rounded overflow-hidden">
							<div className="absolute z-60 flex flex-row gap-1 items-center z-50 px-2 p-1 font-semibold underline mt-2 ml-2 bg-white/10 rounded-md">
								<CiImageOn className=""/>
								<p>{content.title}</p>
							</div>
							<img
								src={`data:image/jpeg;base64,${content.image}`}
								alt="generated"
								className="w-fit h-full absolute object-cover rounded-md"
							/>
							<div className="group w-full h-full absolute z-50 flex items-center justify-center hover:bg-black/20 transition duration-300 cursor-pointer"
								onClick={() => setOpen(e => !e)}
							>
								<div className="w-fit h-fit p-2 bg-white/30 text-black rounded hidden group-hover:flex">
									<CiImageOn/>
								</div>
							</div>
						</div>
						{open &&
						<div className="w-full h-full fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-2">
							<div className="relative group max-w-100 flex flex-col gap-2">
								<div className="absolute z-50 right-0 bottom-[100%] mb-1 mr-1 p-2 bg-white/20 hover:bg-white/10 rounded cursor-pointer"
									onClick={() => setOpen(e =>!e)}
								>
									<FaTimes/>
								</div>
								<img
									src={`data:image/jpeg;base64,${content.image}`}
									alt="generated"
									className="rounded-md"
								/>
								<div className="w-full h-full absolute hover:bg-black/20 transition duration-300"></div>
							</div>
						</div>
						}
					</div>
				)}

				{content.image_error && (
					<p className="text-red-400 text-xs">
						Image failed: {content.image_error}
					</p>
				)}

				{Object.entries(content)
					.filter(([key]) => key !== "image" && key !== "image_error")
					.map(([key, value], idx) => (
						
					<div key={idx}>
						<p className="text-sm w-fit font-semibold capitalize px-2 p-1 bg-white/10 underline rounded">{key}</p>

						{Array.isArray(value) ? (
							<ul className="list-disc ml-4">
								{value.map((v, i) => (
									<li key={i}>{v}</li>
								))}
							</ul>
						) : (
							<p className="w-fit px-1 rounded">{value}</p>
						)}
					</div>
				))}
			</div>
		);
	}

	return null;
};