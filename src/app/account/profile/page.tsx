import { Suspense } from "react";
import UpdateProfile from "@/components/account/UpdateProfile";
import Spinner from "@/components/ui/Spinner";

export const metadata = {
	title: "Update profile",
};

export default function Page() {
	return (
		<div>
			<h2 className="text-accent-400 mb-4 text-2xl font-semibold">
				Update your guest profile
			</h2>

			<p className="text-primary-200 mb-8 text-lg">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<Suspense fallback={<Spinner />}>
				<UpdateProfile />
			</Suspense>
		</div>
	);
}
