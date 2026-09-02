import Link from "next/link";

export default function Page() {
	return (
		<div className="mt-10 flex flex-col items-center justify-center space-y-6 px-4 text-center sm:mt-16 sm:space-y-8">
			<h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
				Thank you for your reservation!
			</h1>

			<p className="text-primary-200 max-w-md text-sm sm:text-base">
				Your booking has been successfully confirmed. You can view and manage
				all your reservations anytime.
			</p>

			<Link
				href="/account/reservations"
				className="bg-accent-500 text-primary-800 hover:bg-accent-600 focus:ring-accent-400 inline-flex w-full items-center justify-center rounded-sm px-6 py-3.5 text-base font-semibold transition-all focus:ring-2 focus:outline-none sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
			>
				Manage your reservations &rarr;
			</Link>
		</div>
	);
}
