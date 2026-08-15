import Link from "next/link";

function NotFound() {
	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<span className="text-accent-500 font-mono text-7xl font-bold tracking-widest sm:text-8xl">
				404
			</span>

			<h1 className="text-primary-100 mt-4 text-2xl font-semibold sm:text-3xl">
				Cabin Not Found
			</h1>

			<p className="text-primary-300 mt-2 max-w-xl text-base text-balance sm:text-lg">
				This cabin could not be found or doesn&apos;t exist anymore.
			</p>

			<Link
				href="/cabins"
				className="bg-accent-500 text-primary-800 hover:bg-accent-600 mt-8 inline-block px-8 py-3.5 text-base font-semibold transition-all active:scale-95 sm:text-lg"
			>
				Back to all cabins
			</Link>
		</main>
	);
}

export default NotFound;
