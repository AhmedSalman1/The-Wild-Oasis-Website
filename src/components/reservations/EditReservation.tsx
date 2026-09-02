import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBooking, getCabin } from "@/lib/data-service";
import EditReservationForm from "./EditReservationForm";

type EditReservationProps = {
	params: Promise<{ bookingId: string }>;
};

export default async function EditReservation({
	params,
}: EditReservationProps) {
	const { bookingId } = await params;
	const session = await auth();
	const guestId = session?.user?.guestId;

	if (!guestId) redirect("/login");

	const booking = await getBooking(bookingId);

	if (!booking || booking.guestId !== guestId || booking.cabinId == null) {
		notFound();
	}

	const cabin = await getCabin(booking.cabinId);

	if (!cabin) notFound();

	return (
		<>
			<h2 className="text-accent-400 mb-7 text-2xl font-semibold">
				Edit Reservation #{bookingId}
			</h2>

			<EditReservationForm
				bookingId={bookingId}
				numGuests={booking.numGuests}
				observations={booking.observations}
				maxCapacity={cabin.maxCapacity}
			/>
		</>
	);
}
