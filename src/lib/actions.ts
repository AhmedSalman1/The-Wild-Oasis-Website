"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export type UpdateGuestState = {
	error?: string;
	success?: boolean;
};

export async function updateGuest(
	prevState: UpdateGuestState | null,
	formData: FormData
): Promise<UpdateGuestState> {
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

export async function signInAction() {
	await signIn("google", {
		redirectTo: "/account",
	});
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
