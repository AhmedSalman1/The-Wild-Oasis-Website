import CabinCard from "@/components/cabins/CabinCard";

export const metadata = {
	title: "Cabins",
};

export default function Page() {
	// CHANGE
	const cabins = [];

	return (
		<div>
			<h1 className="text-accent-400 mb-2 text-2xl font-medium md:text-3xl lg:mb-5 lg:text-4xl">
				Our Luxury Cabins
			</h1>
			<p className="text-primary-200 mb-6 text-base md:text-lg lg:mb-10">
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites.{" "}
				<span className="hidden md:inline">
					Imagine waking up to beautiful mountain views, spending your days
					exploring the dark forests around, or just relaxing in your private
					hot tub under the stars. Enjoy nature&apos;s beauty in your own little
					home away from home.
				</span>{" "}
				The perfect spot for a peaceful, calm vacation. Welcome to paradise.
			</p>

			{cabins.length > 0 && (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 xl:gap-14">
					{cabins.map((cabin) => (
						<CabinCard cabin={cabin} key={cabin.id} />
					))}
				</div>
			)}
		</div>
	);
}
