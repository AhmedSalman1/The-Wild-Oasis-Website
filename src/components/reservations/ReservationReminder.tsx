"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
	const { range, resetRange } = useReservation();

	if (!range || !range.from || !range.to) return null;

	return (
		<div className="bg-accent-500 text-primary-800 fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-8 rounded-full px-8 py-5 font-semibold shadow-xl shadow-slate-900 md:flex">
			<p>
				<span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
				{format(new Date(range.from), "MMM dd yyyy")} to{" "}
				{format(new Date(range.to), "MMM dd yyyy")}
			</p>
			<button
				className="hover:bg-accent-600 rounded-full p-1 transition-all hover:cursor-pointer"
				onClick={resetRange}
			>
				<XMarkIcon className="h-5 w-5" />
			</button>
		</div>
	);
}

export default ReservationReminder;
