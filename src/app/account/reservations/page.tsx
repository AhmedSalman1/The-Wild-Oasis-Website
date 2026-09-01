import { Suspense } from "react";
import ReservationList from "@/components/reservations/ReservationList";
import Spinner from "@/components/ui/Spinner";

export const metadata = {
	title: "Reservations",
};

export default async function Page() {
	return (
		<div>
			<h2 className="text-accent-400 mb-7 text-2xl font-semibold">
				Your reservations
			</h2>

			<Suspense fallback={<Spinner />}>
				<ReservationList />
			</Suspense>
		</div>
	);
}
