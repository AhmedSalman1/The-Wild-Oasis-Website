"use client";

import Image from "next/image";
import { useReservation } from "./ReservationContext";
import { format } from "date-fns";
import { createBooking } from "@/lib/actions";
import { useActionState } from "react";

type ReservationFormProps = {
	cabinId: number;
	maxCapacity: number | null;
	userName: string | null;
	userImage: string | null;
};

export default function ReservationForm({
	cabinId,
	maxCapacity,
	userName,
	userImage,
}: ReservationFormProps) {
	const { range } = useReservation();

	const startDate = range?.from;
	const endDate = range?.to;

	const hasDatesSelected = Boolean(startDate && endDate);

	const [state, formAction, isPending] = useActionState(createBooking, null);

	return (
		<div className="bg-primary-900 border-primary-800 flex h-full w-full flex-col border-t xl:border-t-0 xl:border-l">
			<div>
				<div className="bg-primary-800 text-primary-300 flex items-center justify-between px-4 py-2 sm:px-8 xl:px-10">
					<p className="text-sm sm:text-base">Logged in as</p>

					<div className="flex items-center gap-4">
						{userImage && (
							<Image
								// Important to display google profile images
								referrerPolicy="no-referrer"
								className="h-8 rounded-full"
								src={userImage}
								alt={userName ?? ""}
								width={32}
								height={32}
							/>
						)}
						<p>{userName}</p>
					</div>
				</div>

				<form
					action={formAction}
					className="bg-primary-900 flex flex-1 flex-col justify-between gap-6 px-4 py-6 sm:px-8 sm:py-8 xl:px-10"
				>
					{/* Hidden inputs: cabin/dates only — price & nights are computed server-side */}
					<input type="hidden" name="cabinId" value={cabinId} />
					<input
						type="hidden"
						name="startDate"
						value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
					/>
					<input
						type="hidden"
						name="endDate"
						value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
					/>

					<div className="w-full min-w-0 space-y-2">
						<label htmlFor="numGuests" className="block text-sm sm:text-base">
							How many guests?
						</label>
						<select
							name="numGuests"
							id="numGuests"
							className="bg-primary-200 text-primary-800 focus-visible:ring-accent-500 w-full rounded-sm px-4 py-3 text-sm shadow-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed sm:text-base"
							required
							disabled={isPending || !hasDatesSelected}
						>
							<option value="">Select number of guests…</option>
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
							disabled={isPending || !hasDatesSelected}
							className="bg-primary-200 text-primary-800 focus-visible:ring-accent-500 w-full rounded-sm px-4 py-3 text-sm shadow-sm focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed sm:text-base"
							placeholder="Any pets, allergies, special requirements, etc.?"
						/>
					</div>

					{state?.error && (
						<p role="alert" className="text-sm text-red-400 sm:text-base">
							{state.error}
						</p>
					)}

					<div className="flex flex-col items-start justify-end gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
						{!hasDatesSelected && (
							<p className="text-primary-300 text-xs sm:text-sm">
								Start by selecting dates
							</p>
						)}

						<button
							type="submit"
							disabled={isPending || !hasDatesSelected}
							className="bg-accent-500 text-primary-800 hover:bg-accent-600 focus-visible:ring-accent-400 w-full cursor-pointer px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
						>
							{isPending ? "Reserving…" : "Reserve now"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
