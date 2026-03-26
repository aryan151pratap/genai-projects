import { useState } from "react";
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

function Left(){
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

	const [open, setOpen] = useState(true);
	const [currTab, setCurrTab] = useState("rag");

	return(
		<div className="h-full w-full flex flex-col">
			<div className="p-2">
				{tab.map((i, index) => (
					<div key={index} className="px-2 py-1">
						{i?.name &&
							<p className="p-2 text-white/60 text-sm">{i?.name}</p>
						}
						<div className="flex flex-col gap-1">
							{i?.value.map((j, index_2) => (
								<div key={index_2} className={`flex flex-row gap-1 items-center line-clamp-1 px-3 py-1 capitalize rounded-md
									cursor-pointer transition duration-200
									${currTab == j.name ? "bg-white/15" : "hover:bg-white/10"}
								`}
									onClick={() => setCurrTab(j.name)}
								>
									<div className="">{j.icon}</div>
									{j.name}
								</div>
							))}
						</div>
					</div>
				))}
			</div>

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

			<div className="w-full border-t border-white/10 p-1">
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