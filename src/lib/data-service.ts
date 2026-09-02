import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import type {
	Cabin,
	Booking,
	Guest,
	Settings,
	CabinPrice,
	CabinSummary,
	GuestBookingRow,
	NewGuest,
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
		.maybeSingle();

	if (error) {
		console.error("Error fetching guest:", error);
		throw new Error("Guest could not be loaded");
	}

	return data;
}

export async function getBooking(id: number | string): Promise<Booking | null> {
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("id", Number(id))
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

// View-model fields are guaranteed non-null by app invariants: every booking
// has dates, a price, and a cabin (required cabinId FK), even though the
// generated DB types mark these columns nullable.
export async function getBookings(
	guestId: number | string
): Promise<GuestBookingRow[]> {
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

	return (data ?? []) as GuestBookingRow[];
}

export async function hasAnyBooking(
	guestId: number | string
): Promise<boolean> {
	const { data, error } = await supabase
		.from("bookings")
		.select("id")
		.eq("guestId", Number(guestId))
		.neq("status", "cancelled")
		.limit(1);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return (data?.length ?? 0) > 0;
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

//! CREATE

export async function createGuest(newGuest: NewGuest): Promise<Guest | null> {
	const { data, error } = await supabase
		.from("guests")
		.upsert(newGuest, { onConflict: "email", ignoreDuplicates: true })
		.select()
		.maybeSingle();

	if (error) {
		console.error("Error creating guest:", error);
		throw new Error("Guest could not be created");
	}

	return data;
}
