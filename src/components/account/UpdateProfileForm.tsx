"use client";

import Image from "next/image";

export default function UpdateProfileForm({
	children,
}: {
	children: React.ReactNode;
}) {
	// CHANGE
	const nationality = "Egypt";
	const countryFlag = "https://flagcdn.com/eg.svg";

	return (
		<form className="bg-primary-900 flex w-full max-w-full min-w-0 flex-col gap-6 px-4 py-8 text-lg sm:px-8 md:px-12">
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="w-full min-w-0 space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<Image
						src={countryFlag}
						alt={`${nationality} flag`}
						width={32}
						height={24}
						className="h-5 w-auto rounded-sm object-cover"
					/>
				</div>

				{children}
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					name="nationalID"
					className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
				/>
			</div>

			<div className="flex items-center justify-end gap-6">
				<button className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
					Update profile
				</button>
			</div>
		</form>
	);
}
