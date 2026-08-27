import UpdateProfileForm from "@/components/account/UpdateProfileForm";
import SelectCountry from "@/components/ui/SelectCountry";

export const metadata = {
	title: "Update profile",
};

export default async function Page() {
	// CHANGE
	const nationality = "Egypt";

	return (
		<div>
			<h2 className="text-accent-400 mb-4 text-2xl font-semibold">
				Update your guest profile
			</h2>

			<p className="text-primary-200 mb-8 text-lg">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<UpdateProfileForm>
				<SelectCountry
					name="nationality"
					id="nationality"
					className="bg-primary-200 text-primary-800 w-full min-w-0 truncate rounded-sm px-4 py-3 text-sm shadow-sm md:px-5 md:text-base"
					defaultCountry={nationality}
				/>
			</UpdateProfileForm>
		</div>
	);
}
