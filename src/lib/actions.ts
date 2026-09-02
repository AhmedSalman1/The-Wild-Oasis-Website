"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
	const session = await auth();
	const guestId = session?.user?.guestId;
	if (!session || !guestId) return { error: "You must be logged in" };

	// Extract booking data from hidden input
	const bookingData = JSON.parse(String(formData.get("bookingData") ?? ""));
	const numGuests = Number(formData.get("numGuests"));

	if (!bookingData.startDate || !bookingData.endDate) {
		return { error: "Please select valid check-in and check-out dates" };
	}

	// 2) Fetch cabin details from DB (Single Source of Truth)
	const { data: cabin, error: cabinError } = await supabase
		.from("cabins")
		.select("maxCapacity, regularPrice, discount")
		.eq("id", bookingData.cabinId)
		.single();

	if (cabinError || !cabin || cabin.maxCapacity == null)
		return { error: "Cabin not found" };

	// 3) Validate Guests Capacity
	const { maxCapacity } = cabin;
	if (!Number.isInteger(numGuests) || numGuests < 1 || numGuests > maxCapacity)
		return { error: `Number of guests must be between 1 and ${maxCapacity}` };

	const newBooking = {
		...bookingData,
		guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: String(formData.get("observations") ?? "")
			.trim()
			.slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
	};

	const { error } = await supabase.from("bookings").insert([newBooking]);
	if (error) return { error: "Booking could not be created" };

	revalidatePath(`/cabins/${bookingData.cabinId}`);

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
