import { useState, useEffect } from "react";
import { FaHistory } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

export default function History({ user, chatId, setChatId }) {
	const [hist, setHist] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchHistory();
	}, []);

	const fetchHistory = async () => {
		try {
			setLoading(true);
			const res = await fetch(`${API_URL}/history`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					user_id: user?.user_id
				})
			});
			const result = await res.json();
			if (res.ok) {
				setHist(result.history);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const get_chat_history = function(e){
		setChatId(e);
	}

	const formatDate = (ts) => {
		return new Date(Number(ts)).toLocaleString("en-IN", {
			dateStyle: "medium",
			timeStyle: "short"
		});
	};

	const getGroup = (ts) => {
		const date = new Date(Number(ts));
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		if (date.toDateString() === today.toDateString()) return "Today";
		if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
		return "Older";
	};

	const grouped = hist.reduce((acc, item) => {
		const ts = item.split("_")[1];
		const group = getGroup(ts);
		if (!acc[group]) acc[group] = [];
		acc[group].push(item);
		return acc;
	}, {});

	return (
		<div className="md:w-[250px] w-[220px] h-full text-white flex flex-col overflow-auto">
			<div className="p-3 flex items-center gap-2 rounded-t border border-white/10">
				<FaHistory />
				<span className="font-semibold">History</span>
				<button className="ml-auto text-xs bg-white/10 hover:bg-white/15 px-2 p-1 rounded-md cursor-pointer"
					onClick={() => fetchHistory()}
				>
					reload
				</button>
			</div>

			<div className="h-full flex-1 overflow-y-auto p-2 space-y-4">
				{loading && (
					<div className="text-center text-sm text-gray-200 animate-pulse">
						Loading...
					</div>
				)}

				{Object.keys(grouped).map((group) => (
					<div key={group}>
						<div className="text-xs text-gray-400 px-2 mb-1">
							{group}
						</div>

						{grouped[group].map((item, idx) => {
							const ts = item.split("_")[1];
							return (
								<div
									key={idx}
									className={`px-3 py-1 rounded-md ${chatId == item ? "bg-white/5" : ""} hover:bg-white/10 cursor-pointer transition`}
									onClick={() => get_chat_history(item)}
								>
									<div className="text-sm font-medium truncate">
										{item}
									</div>
									<div className="text-xs text-gray-400">
										{formatDate(ts)}
									</div>
								</div>
							);
						})}
					</div>
				))}
				<div className="mb-20"></div>
			</div>
		</div>
	);
}