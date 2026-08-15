import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { CabinSummary } from "@/types";

function CabinCard({ cabin, index }: { cabin: CabinSummary; index?: number }) {
	const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
	const discountAmount = discount ?? 0;
	const imageSrc = image ?? "";

	const isEager = index !== undefined && index < 2;

	return (
		<div className="border-primary-800 flex flex-col border sm:flex-row">
			<div className="relative h-52 sm:h-auto sm:flex-1">
				<Image
					src={imageSrc}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
					alt={`Cabin ${name}`}
					loading={isEager ? "eager" : "lazy"}
					className="border-primary-800 border-b object-cover sm:border-r sm:border-b-0"
				/>
			</div>

			<div className="flex grow flex-col justify-between">
				<div className="bg-primary-950 px-5 pt-5 pb-4 sm:px-7">
					<h3 className="text-accent-500 mb-3 text-xl font-semibold sm:text-2xl">
						Cabin {name}
					</h3>

					<div className="mb-2 flex items-center gap-3">
						<UsersIcon className="text-primary-600 h-5 w-5" />
						<p className="text-primary-200 text-base sm:text-lg">
							For up to <span className="font-bold">{maxCapacity}</span> guests
						</p>
					</div>

					<p className="flex items-baseline justify-end gap-3">
						{discountAmount > 0 ? (
							<>
								<span className="text-2xl font-[350] sm:text-3xl">
									${regularPrice! - discountAmount}
								</span>
								<span className="text-primary-600 font-semibold line-through">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl font-[350] sm:text-3xl">
								${regularPrice}
							</span>
						)}
						<span className="text-primary-200">/ night</span>
					</p>
				</div>

				<div className="bg-primary-950 border-t-primary-800 border-t text-right">
					<Link
						href={`/cabins/${id}`}
						className="border-primary-800 hover:bg-accent-600 hover:text-primary-900 inline-block w-full border-l px-5 py-3 text-center transition-all sm:w-auto sm:px-6 sm:py-4 sm:text-right"
					>
						Details & reservation &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CabinCard;
