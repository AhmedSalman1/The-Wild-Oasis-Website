import { Suspense } from "react";
import EditReservation from "@/components/reservations/EditReservation";
import Spinner from "@/components/ui/Spinner";

type PageProps = {
	params: Promise<{ bookingId: string }>;
};

export default function Page({ params }: PageProps) {
	return (
		<div>
			<Suspense fallback={<Spinner />}>
				<EditReservation params={params} />
			</Suspense>
		</div>
	);
}
