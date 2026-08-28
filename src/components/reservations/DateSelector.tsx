"use client";

import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { differenceInDays, isWithinInterval } from "date-fns";
import { useReservation } from "./ReservationContext";
import { Cabin, Settings } from "@/types";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
	return (
		range?.from &&
		range?.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from!, end: range.to! })
		)
	);
}

interface DateSelectorProps {
	settings: Settings;
	bookedDates: Date[];
	cabin: Cabin;
}

export default function DateSelector({
	settings,
	bookedDates,
	cabin,
}: DateSelectorProps) {
	const [numberOfMonths, setNumberOfMonths] = useState(2);
	const { range, setRange, resetRange } = useReservation();

	const displayRange = isAlreadyBooked(range, bookedDates)
		? { from: undefined, to: undefined }
		: range;

	useEffect(() => {
		const handleResize = () => {
			setNumberOfMonths(window.innerWidth < 1024 ? 1 : 2);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const regularPrice = cabin.regularPrice ?? 0;
	const discount = cabin.discount ?? 0;
	const numNights =
		displayRange?.from && displayRange?.to
			? differenceInDays(displayRange.to, displayRange.from)
			: 0;
	const cabinPrice = numNights * (regularPrice - discount);

	// SETTINGS
	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className="flex w-full min-w-0 flex-col justify-between">
			<div className="flex justify-center overflow-x-auto p-2 sm:p-4 lg:p-6">
				<DayPicker
					className="place-self-center pt-4"
					classNames={{
						months: "flex flex-col xl:flex-row gap-4 xl:gap-8 justify-center",
						month: "space-y-4",
					}}
					mode="range"
					onSelect={setRange}
					selected={displayRange}

					min={(minBookingLength ?? 0) + 1}
					max={maxBookingLength ?? undefined}

					fromMonth={new Date()}
					fromDate={new Date()}
					toYear={new Date().getFullYear() + 5}
					disabled={[{ before: new Date() }, ...bookedDates]}
					captionLayout="dropdown"
					numberOfMonths={numberOfMonths}
				/>
			</div>

			<div className="bg-accent-500 text-primary-800 flex min-h-18 flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8">
				<div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
					<p className="flex items-baseline gap-2">
						{discount > 0 ? (
							<>
								<span className="text-xl font-bold sm:text-2xl">
									${regularPrice - discount}
								</span>
								<span className="text-primary-700 text-sm font-semibold line-through sm:text-base">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-xl font-bold sm:text-2xl">
								${regularPrice}
							</span>
						)}
						<span className="text-xs sm:text-sm">/night</span>
					</p>

					{numNights ? (
						<>
							<p className="bg-accent-600 px-2 py-1 text-lg sm:px-3 sm:py-2 sm:text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p className="text-sm sm:text-base">
								<span className="font-bold uppercase">Total</span>{" "}
								<span className="text-lg font-semibold sm:text-2xl">
									${cabinPrice}
								</span>
							</p>
						</>
					) : null}
				</div>

				{displayRange?.from || displayRange?.to ? (
					<button
						className="border-primary-800 hover:bg-accent-600 border px-3 py-1.5 text-xs font-semibold transition-colors hover:cursor-pointer sm:text-sm"
						onClick={resetRange}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}
