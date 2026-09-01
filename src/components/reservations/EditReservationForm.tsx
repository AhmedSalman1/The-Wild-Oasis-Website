"use client";

type EditReservationFormProps = {
	bookingId: string;
	numGuests: number | null;
	observations: string | null;
	maxCapacity: number | null;
};

export default function EditReservationForm({
	bookingId,
	numGuests,
	observations,
	maxCapacity,
}: EditReservationFormProps) {
	return (
		<form className="bg-primary-900 flex flex-col gap-6 px-6 py-8 text-lg sm:px-12">
			<input type="hidden" name="bookingId" value={bookingId} />

			<div className="space-y-2">
				<label htmlFor="numGuests">How many guests?</label>
				<select
					name="numGuests"
					id="numGuests"
					defaultValue={numGuests ?? ""}
					className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
					required
				>
					<option value="" key="">
						Select number of guests...
					</option>
					{Array.from({ length: maxCapacity ?? 0 }, (_, i) => i + 1).map(
						(x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						)
					)}
				</select>
			</div>

			<div className="space-y-2">
				<label htmlFor="observations">
					Anything we should know about your stay?
				</label>
				<textarea
					name="observations"
					id="observations"
					defaultValue={observations ?? ""}
					className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
				/>
			</div>

			<div className="flex flex-col items-stretch justify-end gap-6 sm:flex-row sm:items-center">
				<button className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
					Update reservation
				</button>
			</div>
		</form>
	);
}
