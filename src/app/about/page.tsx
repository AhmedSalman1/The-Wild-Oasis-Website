import Image from "next/image";
import Link from "next/link";
import image1 from "@/../public/about-1.jpg";
import image2 from "@/../public/about-2.jpg";

export const metadata = {
	title: "About",
};

export default function Page() {
	return (
		// (gap-y-12) - (lg:gap-x-24 lg:gap-y-32)
		<div className="grid grid-cols-1 items-center gap-y-12 text-base md:text-lg lg:grid-cols-5 lg:gap-x-24 lg:gap-y-32">
			<div className="lg:col-span-3">
				<h1 className="text-accent-400 mb-6 text-2xl font-medium md:text-3xl lg:mb-10 lg:text-4xl">
					Welcome to The Wild Oasis
				</h1>

				<div className="space-y-6 md:space-y-8">
					<p>
						Where nature&apos;s beauty and comfortable living blend seamlessly.
						Hidden away in the heart of the Italian Dolomites, this is your
						paradise away from home. But it&apos;s not just about the luxury
						cabins. It&apos;s about the experience of reconnecting with nature
						and enjoying simple pleasures with family.
					</p>
					<p>
						Our 8 luxury cabins provide a cozy base, but the real freedom and
						peace you&apos;ll find in the surrounding mountains. Wander through
						lush forests, breathe in the fresh air, and watch the stars twinkle
						above from the warmth of a campfire or your hot tub.
					</p>
					<p>
						This is where memorable moments are made, surrounded by
						nature&apos;s splendor. It&apos;s a place to slow down, relax, and
						feel the joy of being together in a beautiful setting.
					</p>
				</div>
			</div>

			<div className="lg:col-span-2">
				<Image
					src={image1}
					alt="Family sitting around a fire pit in front of cabin"
					sizes="(max-width: 639px) 95vw, (max-width: 1023px) 50vw, 40vw"
					placeholder="blur"
					fetchPriority="high"
					className="h-auto w-full"
				/>
			</div>

			<div className="order-2 lg:order-0 lg:col-span-2">
				<Image
					src={image2}
					alt="Family that manages The Wild Oasis"
					sizes="(max-width: 639px) 95vw, (max-width: 1023px) 50vw, 40vw"
					className="h-auto w-full"
				/>
			</div>

			<div className="order-1 lg:order-0 lg:col-span-3">
				<h2 className="text-accent-400 mb-6 text-2xl font-medium md:text-3xl lg:mb-10 lg:text-4xl">
					Managed by our family since 1962
				</h2>

				<div className="space-y-6 md:space-y-8">
					<p>
						Since 1962, The Wild Oasis has been a cherished family-run retreat.
						Started by our grandparents, this haven has been nurtured with love
						and care, passing down through our family as a testament to our
						dedication to creating a warm, welcoming environment.
					</p>
					<p>
						Over the years, we&apos;ve maintained the essence of The Wild Oasis,
						blending the timeless beauty of the mountains with the personal
						touch only a family business can offer. Here, you&apos;re not just a
						guest; you&apos;re part of our extended family. So join us at The
						Wild Oasis soon, where tradition meets tranquility, and every visit
						is like coming home.
					</p>

					<div>
						<Link
							href="/cabins"
							className="bg-accent-500 text-primary-800 hover:bg-accent-600 mt-4 inline-block w-full px-6 py-4 text-center text-base font-semibold transition-all sm:w-auto md:px-8 md:py-5 md:text-lg"
						>
							Explore our luxury cabins
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
