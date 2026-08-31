import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";
import UpdateProfileForm from "./UpdateProfileForm";
import SelectCountry from "@/components/ui/SelectCountry";

export default async function UpdateProfile() {
	const session = await auth();
	const email = session?.user?.email;

	if (!email) return null;

	const guest = await getGuest(email);

	if (!guest) return null;

	return (
		<UpdateProfileForm guest={guest}>
			<SelectCountry
				key={guest.nationality}
				name="nationality"
				id="nationality"
				className="bg-primary-200 text-primary-800 w-full min-w-0 truncate rounded-sm px-4 py-3 text-sm shadow-sm md:px-5 md:text-base"
				defaultCountry={guest.nationality ?? ""}
			/>
		</UpdateProfileForm>
	);
}
