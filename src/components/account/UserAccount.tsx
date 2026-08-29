import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";

export default async function UserAccount() {
	const session = await auth();

	if (session?.user?.image) {
		return (
			<Link
				href="/account"
				className="hover:text-accent-400 flex items-center gap-4 whitespace-nowrap transition-colors"
			>
				<Image
					src={session.user.image}
					alt={session.user.name || "Guest"}
					referrerPolicy="no-referrer"
					className="h-8 w-8 rounded-full"
					width={32}
					height={32}
				/>
				<span className="hidden sm:inline">Guest area</span>
			</Link>
		);
	}

	return (
		<Link
			href="/account"
			className="hover:text-accent-400 whitespace-nowrap transition-colors"
		>
			Guest area
		</Link>
	);
}
