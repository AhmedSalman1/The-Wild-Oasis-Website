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
				className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
				<Header />

				<div className="flex-1 px-4 sm:px-8 py-12">
					<main className="max-w-7xl mx-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
