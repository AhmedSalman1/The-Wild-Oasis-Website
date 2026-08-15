import Image from "next/image";
import { getCabin } from "@/lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

type PageProps = {
	params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: PageProps) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);
	if (!cabin) return { title: "Cabin Not Found" };
	return { title: `Cabin ${cabin.name}` };
}

export default async function Page({ params }: PageProps) {
	const { cabinId } = await params;
	const cabin = await getCabin(cabinId);

	if (!cabin) return null;

	const { name, maxCapacity, image, description } = cabin;

	return (
		<div className="mx-auto max-w-6xl lg:mt-8">
			<div className="border-primary-800 mb-8 flex flex-col border px-6 py-6 sm:px-10 lg:mb-24 lg:grid lg:grid-cols-[3fr_4fr] lg:gap-20 lg:py-3">
				<div className="relative aspect-video w-full lg:aspect-auto lg:-translate-x-3 lg:scale-[1.15]">
					<Image
						src={image!}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						alt={`Cabin ${name}`}
					/>
				</div>

				<div>
					<h3 className="bg-primary-950 text-accent-100 mb-2 p-4 text-3xl font-black sm:text-5xl lg:mb-5 lg:w-[150%] lg:-translate-x-63.5 lg:p-6 lg:pb-1 lg:text-7xl">
						Cabin {name}
					</h3>

					<p className="text-primary-300 mb-7 text-base sm:text-lg lg:mb-10">
						{description}
					</p>

					<ul className="mb-4 flex flex-col gap-4 lg:mb-7">
						<li className="flex items-center gap-3">
							<UsersIcon className="text-primary-600 h-5 w-5 shrink-0" />
							<span className="text-base sm:text-lg">
								For up to <span className="font-bold">{maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex items-center gap-3">
							<MapPinIcon className="text-primary-600 h-5 w-5 shrink-0" />
							<span className="text-base sm:text-lg">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span> (Italy)
							</span>
						</li>
						<li className="flex items-center gap-3">
							<EyeSlashIcon className="text-primary-600 h-5 w-5 shrink-0" />
							<span className="text-base sm:text-lg">
								Privacy <span className="font-bold">100%</span> guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-center text-2xl font-semibold sm:text-4xl lg:text-5xl">
					Reserve today. Pay on arrival.
				</h2>
			</div>
		</div>
	);
}
