"use client";

import { Cabin } from "@/types";
import { useReservation } from "./ReservationContext";

export default function ReservationForm({ cabin }: { cabin: Cabin }) {
	const { range } = useReservation();
	const { maxCapacity } = cabin;

	return (
		<div className="bg-primary-900 border-primary-800 flex h-full w-full flex-col border-t xl:border-t-0 xl:border-l">
			<div>
				<div className="bg-primary-800 text-primary-300 flex items-center justify-between px-4 py-2 sm:px-8 xl:px-10">
					<p className="text-sm sm:text-base">Logged in as</p>

					{/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
				</div>

				<p>
					You have selected {range?.from?.toLocaleDateString()} to{" "}
					{range?.to?.toLocaleDateString()}
				</p>

				<form className="bg-primary-900 flex flex-1 flex-col justify-between gap-6 px-4 py-6 sm:px-8 sm:py-8 xl:px-10">
					<div className="w-full min-w-0 space-y-2">
						<label htmlFor="numGuests" className="block text-sm sm:text-base">
							How many guests?
						</label>
						<select
							name="numGuests"
							id="numGuests"
							className="bg-primary-200 text-primary-800 w-full rounded-sm px-4 py-3 text-sm shadow-sm focus:outline-none sm:text-base"
							required
						>
							<option value="">Select number of guests...</option>
							{Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map(
								(x) => (
									<option value={x} key={x}>
										{x} {x === 1 ? "guest" : "guests"}
									</option>
								)
							)}
						</select>
					</div>

					<div className="w-full min-w-0 space-y-2">
						<label
							htmlFor="observations"
							className="block text-sm sm:text-base"
						>
							Anything we should know about your stay?
						</label>
						<textarea
							name="observations"
							id="observations"
							rows={3}
							className="bg-primary-200 text-primary-800 w-full rounded-sm px-4 py-3 text-sm shadow-sm focus:outline-none sm:text-base"
							placeholder="Any pets, allergies, special requirements, etc.?"
						/>
					</div>

					<div className="flex flex-col items-start justify-end gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
						<p className="text-primary-300 text-xs sm:text-sm">
							Start by selecting dates
						</p>

						<button
							type="submit"
							className="bg-accent-500 text-primary-800 hover:bg-accent-600 w-full cursor-pointer px-6 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
						>
							Reserve now
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
