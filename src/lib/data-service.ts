import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
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
	"use cache";
	cacheLife("hours");
	cacheTag("cabins");

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
	"use cache";
	cacheLife("hours");
	cacheTag("cabins");

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
	"use cache";
	cacheLife("hours");
	cacheTag("cabins");

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
	await connection();

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
	"use cache";
	cacheLife("days");

	const { data, error } = await supabase.from("settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data;
}

export async function getCountries() {
	"use cache";
	cacheLife("weeks");

	try {
		const res = await fetch("https://flagcdn.com/en/codes.json");
		if (!res.ok) throw new Error("Failed to fetch");

		const codes = (await res.json()) as Record<string, string>;

		return Object.entries(codes)
			.filter(([code]) => code !== "il")
			.map(([code, name]) => ({
				code,
				name,
				flag: `https://flagcdn.com/${code}.svg`,
			}))
			.sort((a, b) => a.name.localeCompare(b.name));
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
