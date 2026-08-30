"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData: FormData) {
	const session = await auth();
	const guestId = session?.user?.guestId;

	if (!session || !guestId) throw new Error("You must be logged in");

	const nationalID = String(formData.get("nationalID") ?? "").trim();
	const nationalityData = String(formData.get("nationality") ?? "");
	const [nationality, countryFlag] = nationalityData.split("%");

	if (!nationality || !countryFlag) {
		throw new Error("Please select your country");
	}

	if (nationalID && !/^[a-zA-Z0-9]{6,15}$/.test(nationalID)) {
		throw new Error("Please provide a valid national ID");
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

	if (error) throw new Error("Guest could not be updated");

	revalidatePath("/account/profile");
}

export async function signInAction() {
	await signIn("google", {
		redirectTo: "/account",
	});
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
