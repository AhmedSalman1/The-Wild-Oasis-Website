"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { differenceInDays, isValid, parseISO } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { hasAnyBooking } from "./data-service";
import { supabase } from "./supabase";
import { NewBooking } from "@/types";

export type ActionState = {
	error?: string;
	success?: boolean;
};

export async function updateGuest(
	prevState: ActionState | null,
	formData: FormData
): Promise<ActionState> {
	const session = await auth();
	const guestId = session?.user?.guestId;

	if (!session || !guestId) return { error: "You must be logged in" };

	const nationalID = String(formData.get("nationalID") ?? "").trim();
	const nationalityData = String(formData.get("nationality") ?? "");
	const [nationality, countryFlag] = nationalityData.split("%");

	if (!nationality || !countryFlag) {
		return { error: "Please select your country" };
	}

	if (nationalID && !/^[a-zA-Z0-9]{6,15}$/.test(nationalID)) {
		return { error: "Please provide a valid national ID" };
	}

	const updateData = {
		nationality,
		countryFlag,
		nationalID: nationalID || null,
	};

	const { error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", guestId);

	if (error) return { error: "Guest could not be updated" };

	revalidatePath("/account/profile");

	return { success: true };
}

export async function deleteBooking(bookingId: number) {
	const session = await auth();
	const guestId = session?.user?.guestId;

	if (!session || !guestId) throw new Error("You must be logged in");

	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId)
		.eq("guestId", guestId);

	if (error) throw new Error("Booking could not be deleted");

	revalidatePath("/account/reservations");
}

export async function updateBooking(
	prevState: ActionState | null,
	formData: FormData
): Promise<ActionState> {
	// 1) Authentication
	const session = await auth();
	const guestId = session?.user?.guestId;
	if (!session || !guestId) return { error: "You must be logged in" };

	const bookingId = Number(formData.get("bookingId"));
	const numGuests = Number(formData.get("numGuests"));

	// 2) Authorization + capacity in one query
	const { data: booking, error } = await supabase
		.from("bookings")
		.select("cabins(maxCapacity)")
		.eq("id", bookingId)
		.eq("guestId", guestId)
		.maybeSingle();

	if (error || !booking?.cabins?.maxCapacity)
		return { error: "Booking could not be updated" };

	const { maxCapacity } = booking.cabins;
	if (!Number.isInteger(numGuests) || numGuests < 1 || numGuests > maxCapacity)
		return { error: `Number of guests must be between 1 and ${maxCapacity}` };

	// 3) Update
	const { error: updateError } = await supabase
		.from("bookings")
		.update({
			numGuests,
			observations: String(formData.get("observations") ?? "")
				.trim()
				.slice(0, 1000),
		})
		.eq("id", bookingId)
		.eq("guestId", guestId);

	if (updateError) return { error: "Booking could not be updated" };

	// 4) Revalidation
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	revalidatePath("/account/reservations");

	redirect("/account/reservations");
}

export async function createBooking(
	prevState: ActionState | null,
	formData: FormData
): Promise<ActionState> {
	// 1) Authentication
	const session = await auth();
	const guestId = session?.user?.guestId;
	if (!session || !guestId) return { error: "You must be logged in" };

	// 2) Demo mode: only one non-cancelled booking per guest
	const hasBooking = await hasAnyBooking(guestId);
	if (hasBooking)
		return { error: "👋 You can only create ONE booking in demo mode" };

	// 3) Basic server validation
	const cabinId = Number(formData.get("cabinId"));
	const numGuests = Number(formData.get("numGuests"));
	const startDate = String(formData.get("startDate") ?? "");
	const endDate = String(formData.get("endDate") ?? "");

	if (!Number.isInteger(cabinId) || cabinId <= 0)
		return { error: "Cabin not found" };

	const start = parseISO(startDate);
	const end = parseISO(endDate);
	if (!isValid(start) || !isValid(end) || end <= start)
		return { error: "Please select valid check-in and check-out dates" };

	// 4) Cabin from DB = source of truth for capacity & price
	const { data: cabin, error: cabinError } = await supabase
		.from("cabins")
		.select("maxCapacity, regularPrice, discount")
		.eq("id", cabinId)
		.single();

	if (cabinError || !cabin || cabin.maxCapacity == null)
		return { error: "Cabin not found" };

	if (
		!Number.isInteger(numGuests) ||
		numGuests < 1 ||
		numGuests > cabin.maxCapacity
	)
		return {
			error: `Number of guests must be between 1 and ${cabin.maxCapacity}`,
		};

	// 5) Reject double-booking
	const { data: overlapping } = await supabase
		.from("bookings")
		.select("id")
		.eq("cabinId", cabinId)
		.neq("status", "cancelled")
		.lt("startDate", endDate)
		.gt("endDate", startDate)
		.limit(1);

	if (overlapping && overlapping.length > 0)
		return {
			error:
				"Those dates are no longer available. Please select different dates",
		};

	// 6) Explicit insert — trusted fields only, price computed server-side
	const numNights = differenceInDays(end, start);
	const cabinPrice =
		numNights * ((cabin.regularPrice ?? 0) - (cabin.discount ?? 0));

	const newBooking: NewBooking = {
		cabinId,
		guestId,
		startDate,
		endDate,
		numNights,
		numGuests,
		cabinPrice,
		extrasPrice: 0,
		totalPrice: cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
		observations:
			String(formData.get("observations") ?? "")
				.trim()
				.slice(0, 1000) || null,
	};

	const { error } = await supabase.from("bookings").insert([newBooking]);
	if (error) return { error: "Booking could not be created" };

	revalidatePath(`/cabins/${cabinId}`);
	revalidatePath("/account/reservations");

	redirect("/cabins/thankyou");
}

export async function signInAction() {
	await signIn("google", {
		redirectTo: "/account",
	});
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
