"use client";

import {
	Dialog,
	Description,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useState, useTransition } from "react";
import { deleteBooking } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "../ui/SpinnerMini";

function DeleteReservation({ bookingId }: { bookingId: number }) {
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex min-h-11 flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-bold uppercase transition-colors hover:cursor-pointer md:py-0"
			>
				<TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
				<span className="mt-1">Delete</span>
			</button>

			<Dialog
				open={isOpen}
				onClose={() => !isPending && setIsOpen(false)}
				className="relative z-50"
			>
				<div className="bg-primary-950/80 fixed inset-0" />
				<div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4 sm:p-6">
					<DialogPanel className="border-primary-700 bg-primary-900 text-primary-100 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto border p-5 shadow-2xl sm:p-6">
						<div className="mb-6">
							<div className="mb-3 flex items-center gap-3">
								<TrashIcon className="text-accent-400 h-6 w-6 shrink-0" />
								<DialogTitle className="text-primary-50 text-xl font-semibold sm:text-2xl">
									Delete reservation?
								</DialogTitle>
							</div>
							<Description className="text-primary-200 text-sm leading-6 sm:text-base">
								Are you sure you want to delete this reservation? This action
								cannot be undone.
							</Description>
						</div>

						<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								disabled={isPending}
								className="border-primary-600 text-primary-100 hover:bg-primary-700 focus-visible:ring-accent-400 focus-visible:ring-offset-primary-900 inline-flex min-h-11 w-full items-center justify-center border px-4 py-3 text-sm font-bold uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() =>
									startTransition(async () => {
										await deleteBooking(bookingId);
										setIsOpen(false);
									})
								}
								disabled={isPending}
								className="bg-accent-600 text-primary-950 hover:bg-accent-500 focus-visible:ring-accent-300 focus-visible:ring-offset-primary-900 inline-flex min-h-11 w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
							>
								{isPending ? (
									<>
										<SpinnerMini />
										<span>Deleting...</span>
									</>
								) : (
									<>
										<TrashIcon className="h-5 w-5" />
										<span>Delete reservation</span>
									</>
								)}
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}

export default DeleteReservation;
