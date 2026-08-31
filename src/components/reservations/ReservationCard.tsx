import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import type { GuestBookingRow } from "@/types";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace("about ", "");

type ReservationCardProps = {
	booking: GuestBookingRow;
	isFirst: boolean;
};

function ReservationCard({ booking, isFirst }: ReservationCardProps) {
	const {
		id,
		startDate,
		endDate,
		numNights,
		totalPrice,
		numGuests,
		created_at,
		cabins: { name, image },
	} = booking;

	return (
		<div className="border-primary-800 flex flex-col border md:flex-row">
			<div className="relative h-40 shrink-0 md:h-auto md:w-32">
				<Image
					src={image}
					fill
					sizes="(max-width: 768px) 100vw, 128px"
					loading={isFirst ? "eager" : "lazy"}
					alt={`Cabin ${name}`}
					className="border-primary-800 border-b object-cover md:border-r md:border-b-0"
				/>
			</div>

			<div className="flex min-w-0 grow flex-col px-4 py-3 md:px-6">
				<div className="mb-2 flex items-start justify-between gap-2">
					<h3 className="text-lg font-semibold wrap-break-word md:text-xl">
						{numNights} nights in Cabin {name}
					</h3>
					{isPast(new Date(startDate)) ? (
						<span className="flex h-7 shrink-0 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold whitespace-nowrap text-yellow-200 uppercase">
							past
						</span>
					) : (
						<span className="flex h-7 shrink-0 items-center rounded-sm bg-green-800 px-3 text-xs font-bold whitespace-nowrap text-green-200 uppercase">
							upcoming
						</span>
					)}
				</div>

				<p className="text-primary-300 mb-2 text-sm wrap-break-word md:text-lg">
					{format(new Date(startDate), "EEE, MMM dd yyyy")} (
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}
					) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
				</p>

				<div className="mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-1">
					<p className="text-accent-400 text-xl font-semibold">${totalPrice}</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-primary-300 text-sm md:text-lg">
						{numGuests} guest{numGuests > 1 && "s"}
					</p>
					<p className="text-primary-400 ml-auto hidden self-end text-xs md:block">
						Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
					</p>
				</div>
			</div>

			<div className="border-primary-800 divide-primary-800 flex divide-x border-t md:w-24 md:flex-col md:divide-x-0 md:divide-y md:border-t-0 md:border-l">
				{!isPast(startDate) ? (
					<>
						<Link
							href={`/account/reservations/edit/${id}`}
							className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex min-h-11 flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-bold uppercase transition-colors md:py-0"
						>
							<PencilSquareIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
							<span className="mt-1">Edit</span>
						</Link>
						<DeleteReservation bookingId={id} />
					</>
				) : null}
			</div>
		</div>
	);
}

export default ReservationCard;
