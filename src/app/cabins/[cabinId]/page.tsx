import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCabin, getCabins } from "@/lib/data-service";
import Reservation from "@/components/reservations/Reservation";
import Spinner from "@/components/ui/Spinner";
import Cabin from "@/components/cabins/Cabin";

type PageProps = {
	params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: PageProps) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);
	if (!cabin) return { title: "Cabin Not Found" };
	return { title: `Cabin ${cabin.name}` };
}

export async function generateStaticParams() {
	const cabins = await getCabins();

	const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
	return ids;
}

export default async function Page({ params }: PageProps) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);

	if (!cabin) notFound();

	return (
		<div className="mx-auto max-w-6xl lg:mt-8">
			<Cabin cabin={cabin} />

			<div className="mt-8">
				<h2 className="text-accent-400 mb-6 text-center text-xl font-semibold sm:text-3xl lg:mb-10 lg:text-4xl">
					Reserve {cabin.name} today. Pay on arrival.
				</h2>

				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}
