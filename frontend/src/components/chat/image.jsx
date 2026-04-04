import { FaTimes } from "react-icons/fa";

export default function Image({image, setImage}){
	const handleSize = function(size){
		let s = "";
		if(size >= 1024 * 1024 * 1024){
			s = size/(1024*1024*1024).toFixed(2) + " GB";
		}else if(size > 1024*1024){
			s = size/(1024*1024).toFixed(2) + " MB";
		}else if(size > 1024){
			s = (size/1024).toFixed(2) + " KB";
		}else{
			s = size.toFixed(2) + " B";
		}
		return s;
	}

	const handleDelete = function(i){
		setImage(image.filter((e) => e.name != i.name));
	}
	
	return(
		<div className="flex flex-wrap gap-2 p-2">
			{image.map((i, index) => (
				<div key={index} className="border border-white/0 hover:border-white/20 rounded group flex flex-row gap-2 relative w-fit bg-white/10 hover:bg-white/15 transition duration-300 p-1">
					<div className="transition-all duration-500 flex flex-row gap-2">
						{i.image ?
						<img src={i?.image} className="p-0.5 border border-white/20 rounded max-w-15 h-10 object-cover" />
						:
						<div className="p-1 px-2 text-xs flex items-center bg-black/20 border border-white/10 rounded-md">
							{i?.name.split(".")[1]}
						</div>
						}
						<div className="shrink-0 text-xs flex flex-col justify-center">
							<p className="font-semibold">{i?.name}</p>
							<p className="flex gap-2 font-thin text-[11px] text-white/80">
								<p className="uppercase px-1 bg-white/5 rounded">{i?.name.split(".")[1]}</p>
								<p className="">{handleSize(i?.size)}</p>
							</p>
						</div>
					</div>
					<div className="w-5 relative h-fit text-xs ">
						<div className="w-full hover:bg-white/10 p-1 absolute rounded cursor-pointer hidden group-hover:flex transition-all duration-500"
							onClick={() => handleDelete(i)}
						>
							<FaTimes/>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}