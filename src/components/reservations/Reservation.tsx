import DateSelector from "@/components/reservations/DateSelector";
import ReservationForm from "@/components/reservations/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import { Cabin } from "@/types";

export default async function Reservation({ cabin }: { cabin: Cabin }) {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);

	return (
		<div className="border-primary-800 grid min-w-0 grid-cols-1 items-stretch border xl:grid-cols-[1.5fr_1fr]">
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				cabin={cabin}
			/>
			<ReservationForm cabin={cabin} />
		</div>
	);
}
