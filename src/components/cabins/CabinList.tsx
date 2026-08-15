import CabinCard from "@/components/cabins/CabinCard";
import { getCabins } from "@/lib/data-service";

export default async function CabinList() {
	const cabins = await getCabins();

	if (!cabins?.length) return null;

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 xl:gap-14">
			{cabins.map((cabin, index) => (
				<CabinCard cabin={cabin} key={cabin.id} index={index} />
			))}
		</div>
	);
}
