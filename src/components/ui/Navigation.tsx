import Link from "next/link";
import UserAccount from "../account/UserAccount";
import { Suspense } from "react";

export default async function Navigation() {
	return (
		<nav className="z-10 text-base sm:text-xl">
			<ul className="flex items-center gap-4 sm:gap-8 md:gap-16">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors duration-300"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>
				<li>
					<Suspense
						fallback={
							<Link
								href="/account"
								className="hover:text-accent-400 whitespace-nowrap transition-colors"
							>
								Guest area
							</Link>
						}
					>
						<UserAccount />
					</Suspense>
				</li>
			</ul>
		</nav>
	);
}
