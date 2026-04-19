import { CiSettings } from "react-icons/ci";
import { FaTimes, FaUser, FaEnvelope, FaIdBadge, FaSignOutAlt } from "react-icons/fa";

export default function Setting({ user, onClose, onLogout }) {
	return (
		<div className="w-fit h-fit fixed inset-0 left-auto z-50 flex items-start justify-end p-4">
			<div className="w-80 bg-black/80 shadow-md shadow-black/60 backdrop-blur-sm text-white rounded-xl shadow-lg border border-white/10 overflow-hidden">
				
				<div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
					<CiSettings className="w-6 h-6 p-1 bg-white/10 rounded-md" />
					<p className="font-semibold">Settings</p>

					<button
						onClick={() => onClose(e => !e)}
						className="ml-auto p-1 rounded-md hover:bg-white/10 transition"
					>
						<FaTimes />
					</button>
				</div>

				<div className="flex flex-col text-sm">					
					<div className="flex items-center gap-2 px-3 py-1 border-b border-white/10">
						<FaUser className="shrink-0 h-5 w-5 p-1 bg-green-400/30 rounded" />
						<span className="shrink-0 capitalize text-white/70">Name:</span>
						<span className="ml-auto truncate">{user.name}</span>
					</div>
					<div className="flex items-center gap-2 px-3 py-1 border-b border-white/10">
						<FaEnvelope className="shrink-0 h-5 w-5 p-1 bg-blue-400/30 rounded" />
						<span className="shrink-0 capitalize text-white/70">Email:</span>
						<span className="ml-auto truncate">{user.email}</span>
					</div>
					<div className="shrink-0 flex items-center gap-2 px-3 py-1">
						<FaIdBadge className="shrink-0 h-5 w-5 p-1 bg-yellow-400/30 rounded" />
						<span className="shrink-0 capitalize text-white/70">User ID:</span>
						<span className="ml-auto truncate">{user.user_id}</span>
					</div>
				</div>

				<div className="flex items-center px-3 py-2 border-t border-white/10">
					<button
						onClick={onLogout}
						className="ml-auto flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded-md text-sm transition cursor-pointer"
					>
						<FaSignOutAlt />
						Logout
					</button>
				</div>

			</div>
		</div>
	);
}