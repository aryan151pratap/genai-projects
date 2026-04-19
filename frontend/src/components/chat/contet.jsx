import { useState } from "react";
import { CiImageOn, CiImport } from "react-icons/ci";
import { FaCheck, FaCopy, FaDownload, FaTimes } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";

const downloadImage = (base64, filename = "image.jpg") => {
	const link = document.createElement("a");
	link.href = `data:image/jpeg;base64,${base64}`;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const copyImage = async (b64, setCopy) => {
	try {
		setCopy(true);
		const img = new Image();
		img.src = b64;
		await new Promise(r => (img.onload = r));

		const c = document.createElement("canvas");
		c.width = img.width;
		c.height = img.height;
		c.getContext("2d").drawImage(img, 0, 0);

		const blob = await new Promise(r => c.toBlob(r, "image/png"));

		await navigator.clipboard.write([
			new ClipboardItem({ "image/png": blob })
		]);
	} catch(err) {
		console.log(err);
	} finally {
		setTimeout(() => setCopy(false), 1000);
	}
};

export default function Content({ i }) {
	const [open, setOpen] = useState(false);
	const [copy, setCopy] = useState(false);
	const content = i?.content;

	if (typeof content === "string") {
		return <div className="w-fit text-wrap">{content}</div>;
	}

	if (typeof content === "object" && content !== null) {
		return (
			<div className="w-full text-wrap space-y-2">
				
				{content.image && (
					<div className="w-full h-full mt-10 p-2">
						<div className="flex flex-row gap-2 items-center mb-2">
							<div className="flex flex-row gap-1 items-center w-fit ml-auto p-1 bg-white/10 rounded">
								<CiImageOn className="text-green-400 bg-green-400/20 h-6 w-6 p-1 rounded"/>
								<p className="px-1">Generated Image</p>
							</div>
							<div className="p-2 bg-white/10 hover:bg-white/20 rounded cursor-pointer"
								onClick={() => copyImage(content.image, setCopy)}
							>
								{copy ?
									<FaCheck className="text-green-300"/>
									:
									<BsCopy/>
								}
							</div>
						</div>
						<div className="group w-full ml-auto sm:max-w-80 sm:h-80 relative rounded overflow-hidden shadow-md shadow-black/20 hover:shadow-black/40 transition duration-300">
							<div className="hidden group-hover:flex absolute z-20 flex-row gap-1 items-center px-2 p-1 font-semibold mt-2 ml-2 bg-white/10 rounded-md">
								<CiImageOn className=""/>
								<p>{content.title}</p>
							</div>
							<img
								src={content.image}
								alt="generated"
								className="w-fit h-full absolute object-cover rounded-md"
							/>
							<div className="group w-full h-full absolute z-10 flex items-center justify-center hover:bg-black/20 transition duration-300 cursor-pointer"
								onClick={() => setOpen(e => !e)}
							>
								<div className="w-fit h-fit p-2 bg-white/30 text-black rounded hidden group-hover:flex">
									<CiImageOn/>
								</div>
							</div>
						</div>
						{open &&
						<div className="w-full h-full fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center p-2">
							<div className="max-w-100 flex flex-col gap-2">
								<div className="w-full flex flex-row item-center justify-between">
									<div className="w-fit flex flex-row gap-1 items-center px-2 p-1 font-semibold   bg-white/10 rounded-md">
										<CiImageOn className=""/>
										<p>{content.title}</p>
									</div>
									<div className="flex gap-2">
										<div
											className="p-2 bg-white/20 hover:bg-white/10 rounded cursor-pointer"
											onClick={() => downloadImage(content.image, content.title || "image.jpg")}
										>
											<CiImport />
										</div>

										<div
											className="p-2 bg-white/20 hover:bg-white/10 rounded cursor-pointer"
											onClick={() => setOpen(e => !e)}
										>
											<FaTimes />
										</div>
									</div>
								</div>
								<div className="group w-full relative flex rounded-md overflow-hidden shadow-md shadow-black/20 hover:shadow-black/50 transition duration-300">
									<img
										src={content.image}
										alt="generated"
										className="rounded-md"
									/>
									<div className="w-full h-full absolute z-50 hover:bg-black/20 transition duration-300"></div>
								</div>
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
									<div key={i}>
										<p>{i}</p>
										<li>{v}</li>
									</div>
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