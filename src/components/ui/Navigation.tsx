import Link from "next/link";

export default function Navigation() {
	return (
		// text-base sm:
		<nav className="z-10 text-xl">
			<ul className="flex items-center gap-4 sm:gap-8 md:gap-16">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors duration-300">
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors">
						About
					</Link>
				</li>
				<li>
					<Link
						href="/account"
						className="hover:text-accent-400 transition-colors whitespace-nowrap">
						Guest area
					</Link>
				</li>
			</ul>
		</nav>
	);
}
