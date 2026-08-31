import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import ReservationCard from "./ReservationCard";

export default async function ReservationList() {
	const session = await auth();
	const guestId = session?.user?.guestId;

	if (!guestId) redirect("/login");

	const bookings = await getBookings(guestId);

	if (bookings.length === 0) {
		return (
			<p className="text-base sm:text-lg">
				You have no reservations yet. Check out our{" "}
				<Link
					className="text-accent-500 hover:text-accent-600 inline-block underline underline-offset-4 transition-colors"
					href="/cabins"
				>
					luxury cabins &rarr;
				</Link>
			</p>
		);
	}

	return (
		<ul className="space-y-6">
			{bookings.map((booking, index) => (
				<ReservationCard
					booking={booking}
					key={booking.id}
					isFirst={index === 0}
				/>
			))}
		</ul>
	);
}
