import { useState } from "react";
import { FaTimes, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Setting from "./components/login/setting";

function Header({data}){
	const [open, setOpen] = useState(false);

	const remove_data = function(name){
		localStorage.removeItem(name);
	}

	const logout = function(){
		remove_data("chat_name");
		remove_data("chat_email");
		remove_data("user_id");
		window.location.reload();
	}
	return(
		<div className="relative h-fit w-full flex flex-row gap-2 p-1">
			<div className="ml-auto flex flex-row gap-2 px-2">
				<div className="w-fit rounded">
					{data?.user_id ?
						<div className="px-2 flex items-center font-bold capitalize cursor-pointer"
							onClick={() => setOpen(e => !e)}
						>
							<p>{data.name.split("")[0]}</p>
							{console.log(data)}
						</div>
					:
						<div className="flex flex-row items-end gap-2">
							<div className="p-1.5 bg-white/20 rounded">
								<FaUser className=""/>
							</div>
							<Link to={"/signup"} className="capitalize underline">
								sign in
							</Link>
						</div>
					}
				</div>
			</div>
			{open &&
				<div>
					<Setting user={data} onClose={setOpen} onLogout={logout}/>
				</div>
			}
		</div>
	)
}

export default Header;