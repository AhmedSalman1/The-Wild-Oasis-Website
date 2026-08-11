import Image from "next/image";
import Link from "next/link";
import bg from "@/../public/bg.png";

export default function Page() {
	return (
		<>
			<div className="fixed inset-0 z-0">
				<Image
					src={bg}
					fill
					preload={true}
					placeholder="blur"
					className="object-cover object-top"
					alt="Mountains and forests with two cabins"
				/>
			</div>

			<div className="relative z-10 mt-24 text-center">
				<h1 className="text-primary-50 mb-10 text-3xl font-normal tracking-tight sm:text-5xl md:text-8xl">
					Welcome to paradise.
				</h1>
				<Link
					href="/cabins"
					className="bg-accent-500 text-primary-800 hover:bg-accent-600 inline-block px-8 py-6 text-xl font-semibold transition-all"
				>
					Explore luxury cabins
				</Link>
			</div>
		</>
	);
}
