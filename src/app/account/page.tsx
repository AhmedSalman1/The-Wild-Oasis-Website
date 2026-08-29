import { Suspense } from "react";
import WelcomeMessage from "@/components/account/WelcomeMessage";

export const metadata = {
	title: "Guest area",
};

export default async function Page() {
	return (
		<Suspense
			fallback={
				<h2 className="text-accent-400 mb-7 text-2xl font-semibold opacity-50">
					Welcome...
				</h2>
			}
		>
			<WelcomeMessage />
		</Suspense>
	);
}
