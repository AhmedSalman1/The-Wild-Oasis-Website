import CabinCard from "@/components/cabins/CabinCard";
import { getCabins } from "@/lib/data-service";

type CabinListProps = {
	searchParams: Promise<{ capacity: string }>;
};

export default async function CabinList({ searchParams }: CabinListProps) {
	const filter = (await searchParams)?.capacity ?? "all";
	const cabins = await getCabins();

	if (!cabins?.length) return null;

	const displayedCabins = cabins.filter((cabin) => {
		if (cabin.maxCapacity == null) return false;
		if (filter === "small") return cabin.maxCapacity <= 3;
		if (filter === "medium")
			return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
		if (filter === "large") return cabin.maxCapacity >= 8;
		return true;
	});

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 xl:gap-14">
			{displayedCabins.map((cabin, index) => (
				<CabinCard cabin={cabin} key={cabin.id} index={index} />
			))}
		</div>
	);
}
