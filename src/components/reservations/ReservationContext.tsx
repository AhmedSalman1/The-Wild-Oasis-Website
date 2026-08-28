"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
	range: DateRange | undefined;
	setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	resetRange: () => void;
}

export const ReservationContext = createContext<
	ReservationContextType | undefined
>(undefined);

const initialState: DateRange = { from: undefined, to: undefined };

export function ReservationProvider({ children }: { children: ReactNode }) {
	const [range, setRange] = useState<DateRange | undefined>(initialState);

	const resetRange = () => setRange(initialState);

	return (
		<ReservationContext value={{ range, setRange, resetRange }}>
			{children}
		</ReservationContext>
	);
}

export function useReservation() {
	const context = useContext(ReservationContext);

	if (!context) {
		throw new Error(
			"useReservationContext must be used within a ReservationProvider"
		);
	}

	return context;
}
