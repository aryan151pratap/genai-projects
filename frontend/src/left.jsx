import { useEffect, useState } from "react";
import {
  CiHome,
  CiChat1,
  CiDatabase,
  CiSettings,
  CiImageOn,
  CiMicrophoneOn,
  CiViewList,
  CiClock2,
  CiGrid31,
  CiGrid32,
  CiSquareRemove
} from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const tab = [
	{
		name: "",
		value: [
			{ name: "home", icon: <GoHome className="w-5 h-5"/> }
		]
	},
	{
		name: "create",
		value: [
			{ name: "chat", icon: <CiChat1 className="w-5 h-5"/> },
			{ name: "rag", icon: <CiDatabase className="w-5 h-5"/> },
			{ name: "agent builder", icon: <CiSettings className="w-5 h-5"/> },
			{ name: "images", icon: <CiImageOn className="w-5 h-5"/> },
			{ name: "audios", icon: <CiMicrophoneOn className="w-5 h-5"/> }
		]
	},
	{
		name: "manage",
		value: [
			{ name: "usage", icon: <CiViewList className="w-5 h-5"/> },
			{ name: "history", icon: <CiClock2 className="w-5 h-5"/> }
		]
	}
];

function Left(){
	const location = useLocation();
	const [open, setOpen] = useState(true);
	const [currTab, setCurrTab] = useState(location.pathname.split("/")[1]);


	return(
		<div className={`h-full ${open ? "max-w-60 lg:max-w-70" : "w-10"} flex flex-col`}>
			<div className="w-full">
				{tab.map((i, index) => (
					<div key={index} className={`${open ? "px-2 py-1" : "flex items-center p-1 items-center justify-center"}`}>
						{open && i?.name &&
							<p className="p-2 text-white/60 text-sm">{i?.name}</p>
						}
						<div className="flex flex-col gap-1">
							{i?.value.map((j, index_2) => (
								<Link to={`/${j.name}`} key={index_2} className={`flex flex-row gap-1 items-center line-clamp-1 ${open ? "px-3 py-1" : "p-1"} capitalize rounded-md
									cursor-pointer transition duration-200
									${currTab == j.name ? "bg-white/15" : "hover:bg-white/10"}
								`}
									onClick={() => setCurrTab(j.name)}
								>
									<div className={`${!open && "border p-0.5 border-white/20 rounded"}`}>{j.icon}</div>
									{open && j.name}
								</Link>
							))}
						</div>
					</div>
				))}
			</div>

			{open &&
			<div className="w-full text-wrap h-fit rounded mt-auto border-t border-white/10 p-2">
				<div className="flex flex-col p-1 border border-white/20 rounded-md">
					<div className="flex flex-row items-center justify-between p-1">
						<p className="capitalize font-semibold">name</p>
						<div className="p-1 hover:bg-white/10 rounded cursor-pointer">
							<CiSquareRemove className="h-4 w-4"/>
						</div>
					</div>
					<p className="p-1 text-sm text-white/60 font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, blanditiis.</p>
				</div>
			</div>
			}

			<div className={`${!open && "mt-auto"} w-full border-t border-white/10 p-1`}>
				<div className="hover:bg-white/10 w-fit rounded cursor-pointer p-1
					transition duration-300
				"
					onClick={() => setOpen(e => !e)}
				>
					{open ?
						<CiGrid31 className="h-6 w-6"/>
					:
						<CiGrid32 className="h-6 w-6"/>
					}
				</div>
			</div>
		</div>
	)
}

export default Left;