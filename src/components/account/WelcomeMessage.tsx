import { auth } from "@/lib/auth";

export default async function WelcomeMessage() {
	const session = await auth();
	const firstName = session?.user?.name?.split(" ")[0] || "Guest";

	return (
		<h2 className="text-accent-400 mb-7 text-2xl font-semibold">
			Welcome, {firstName}
		</h2>
	);
}
