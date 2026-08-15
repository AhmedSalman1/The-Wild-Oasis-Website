import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import type {
	Cabin,
	Booking,
	Guest,
	Settings,
	GuestUpdate,
	BookingUpdate,
	CabinPrice,
	CabinSummary,
} from "@/types";

//! GET

export async function getCabin(id: number | string): Promise<Cabin | null> {
	const { data, error } = await supabase
		.from("cabins")
		.select("*")
		.eq("id", Number(id))
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

export async function getCabinPrice(
	id: number | string
): Promise<CabinPrice | null> {
	const { data, error } = await supabase
		.from("cabins")
		.select("regularPrice, discount")
		.eq("id", Number(id))
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

export async function getCabins(): Promise<CabinSummary[]> {
	const { data, error } = await supabase
		.from("cabins")
		.select("id, name, maxCapacity, regularPrice, discount, image")
		.order("name");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
	const { data, error } = await supabase
		.from("guests")
		.select("*")
		.eq("email", email)
		.single();

	if (error) {
		// It's fine if guest doesn't exist yet
		return null;
	}

	return data;
}

export async function getBooking(id: number | string): Promise<Booking> {
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("id", Number(id))
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not get loaded");
	}

	return data;
}

// Note: We let TS infer the return type because of the nested `cabins(name, image)` relation
export async function getBookings(guestId: number | string) {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
		)
		.eq("guestId", Number(guestId))
		.order("startDate");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data ?? [];
}

export async function getBookedDatesByCabinId(
	cabinId: number | string
): Promise<Date[]> {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayIso = today.toISOString();

	// Getting all bookings
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("cabinId", Number(cabinId))
		.or(`startDate.gte.${todayIso},status.eq.checked-in`);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	// Converting to actual dates to be displayed in the date picker
	// Skip bookings with missing dates to avoid null date issues
	const bookedDates = (data ?? [])
		.filter((booking) => booking.startDate && booking.endDate)
		.map((booking) => {
			return eachDayOfInterval({
				start: new Date(booking.startDate as string),
				end: new Date(booking.endDate as string),
			});
		})
		.flat();

	return bookedDates;
}

export async function getSettings(): Promise<Settings> {
	const { data, error } = await supabase.from("settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data;
}

export async function getCountries() {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag"
		);
		const countries = await res.json();
		return countries;
	} catch {
		throw new Error("Could not fetch countries");
	}
}

//! UPDATE

export async function updateGuest(
	id: number | string,
	updatedFields: GuestUpdate
): Promise<Guest> {
	const { data, error } = await supabase
		.from("guests")
		.update(updatedFields)
		.eq("id", Number(id))
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}
	return data;
}

export async function updateBooking(
	id: number | string,
	updatedFields: BookingUpdate
): Promise<Booking> {
	const { data, error } = await supabase
		.from("bookings")
		.update(updatedFields)
		.eq("id", Number(id))
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

//! DELETE

// Returns boolean to indicate success in enterprise apps
export async function deleteBooking(id: number | string): Promise<boolean> {
	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", Number(id));

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}

	return true;
}
