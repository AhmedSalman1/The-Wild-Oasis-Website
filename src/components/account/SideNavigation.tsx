import Link from "next/link";
import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";

const navLinks = [
	{
		name: "Home",
		href: "/account",
		icon: <HomeIcon className="text-primary-600 h-5 w-5" />,
	},
	{
		name: "Reservations",
		href: "/account/reservations",
		icon: <CalendarDaysIcon className="text-primary-600 h-5 w-5" />,
	},
	{
		name: "Guest profile",
		href: "/account/profile",
		icon: <UserIcon className="text-primary-600 h-5 w-5" />,
	},
];

function SideNavigation() {
	return (
		<nav className="border-primary-900 h-auto border-b md:h-full md:border-r md:border-b-0">
			<ul className="flex h-full flex-row gap-2 overflow-x-auto text-base md:flex-col md:overflow-x-visible md:text-lg">
				{navLinks.map((link) => (
					<li key={link.name} className="flex-1 md:flex-none">
						<Link
							className="hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex items-center justify-center gap-2 rounded-md px-3 py-3 font-semibold whitespace-nowrap transition-colors md:justify-start md:gap-4 md:rounded-none md:px-5"
							href={link.href}
						>
							{link.icon}
							<span className="hidden sm:inline">{link.name}</span>
						</Link>
					</li>
				))}

				<li className="flex-1 md:mt-auto md:flex-none">
					<SignOutButton />
				</li>
			</ul>
		</nav>
	);
}

export default SideNavigation;
