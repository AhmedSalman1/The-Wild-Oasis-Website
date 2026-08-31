import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteReservation({ bookingId }: { bookingId: number }) {
	return (
		<button className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex min-h-11 flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-bold uppercase transition-colors md:py-0">
			<TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
			<span className="mt-1">Delete</span>
		</button>
	);
}

export default DeleteReservation;
