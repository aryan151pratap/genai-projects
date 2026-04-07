import { useState } from "react";
import { CiImport } from "react-icons/ci";
import { FaTimes, FaUpload } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

export default function Files({setOpen, media, setMedia}) {
	const [files, setFiles] = useState([]);
	const [url, setUrl] = useState("");

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setFiles(selectedFiles);
		console.log("Files:", selectedFiles);
	};

	const handleSubmit = () => {
		const mediaSet = new Set(media.map((i) => i.name));
		const data = files.filter((i) => !mediaSet.has(i.name));
		setMedia(e => [...e, ...data]);
		setOpen(false);
	};

	return (
		<div className="w-fit text-sm h-full bg-black border border-white/20 shadow-xl shadow-white/5 flex flex-col gap-1 rounded-xl border border-white/10">
			<div className="px-3 p-2 text-xs flex flex-row gap-2 items-center border-b border-white/20">
				<FaUpload className="text-white/70 bg-white/10 rounded p-1 w-5 h-5"/>
				Upload files
				<FaTimes className="ml-auto text-white/70 bg-white/15 hover:bg-white/20 transition duration-300 rounded p-1 w-5 h-5 cursor-pointer"
					onClick={() => setOpen(e => !e)}
				/>
			</div>
			<div className="flex flex-col gap-1 p-3">
				<div className="w-full">
					<label className="flex flex-row gap-1 border border-white/15 hover:border-white/20 bg-white/10 hover:bg-white/15 p-2 rounded-md transition duration-300 cursor-pointer">
						<div>
							<FiUpload />
						</div>
						<input
							type="file"
							multiple
							accept=".txt,.pdf"
							onChange={handleFileChange}
							className="hidden"
						/>
						<span className="line-clamp-1 text-xs text-white/60">
							{files.length > 0
								? `${files.length} file(s) selected`
								: "Upload files"}
						</span>
					</label>

				</div>

				<div>
					<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="Enter website URL..."
					className="w-full outline-none border border-white/10 rounded-lg p-2 bg-black/40 focus:border-white/30 transition"
					/>
				</div>

				<div>
					<button
						onClick={handleSubmit}
						className="w-fit flex items-center justify-center gap-2 px-2 p-1 border border-white/10 bg-white/10 hover:bg-white/15 hover:border-white/20 rounded-lg cursor-pointer transition duration-300"
					>
						<CiImport/>
						Import
					</button>
				</div>
			</div>
		</div>
	);
}