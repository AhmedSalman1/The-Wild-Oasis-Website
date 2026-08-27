"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const activeFilter = searchParams.get("capacity") ?? "all";

	function handleFilter(filter: string) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);

		startTransition(() => {
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	}

	return (
		<div
			className={`border-primary-800 flex w-full flex-wrap border sm:w-auto sm:flex-nowrap ${isPending ? "opacity-70" : ""} `}
		>
			<Button
				filter="all"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				All Cabins
			</Button>

			<Button
				filter="small"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				2&mdash;3 guests
			</Button>

			<Button
				filter="medium"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				4&mdash;7 guests
			</Button>

			<Button
				filter="large"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				8&mdash;12 guests
			</Button>
		</div>
	);
}

interface ButtonProps {
	filter: string;
	handleFilter: (filter: string) => void;
	activeFilter: string;
	children: React.ReactNode;
}

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
	return (
		<button
			className={`hover:bg-primary-700 flex-1 cursor-pointer px-2 py-2 text-center text-xs transition-colors sm:flex-initial sm:px-5 sm:text-base ${
				filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
			}`}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}

export default Filter;
