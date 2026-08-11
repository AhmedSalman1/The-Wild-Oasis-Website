import type { Metadata } from "next";
import { josefin } from "@/styles/fonts";

import "@/styles/globals.css";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
	title: {
		default: "Welcome | The Wild Oasis",
		template: "%s | The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel, located right in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body
				className={`${josefin.className} bg-primary-950 text-primary-100 flex min-h-screen flex-col antialiased`}
			>
				<Header />

				<div className="flex-1 px-4 py-4 sm:px-8 md:py-8 lg:py-12">
					<main className="mx-auto max-w-7xl">{children}</main>
				</div>
			</body>
		</html>
	);
}
