import SignInButton from "@/components/account/SignInButton";

export const metadata = {
	title: "Login",
};

export default function page() {
	return (
		<div className="mt-10 flex flex-col items-center gap-6 px-4 text-center sm:gap-10">
			<h2 className="text-lg font-semibold sm:text-3xl">
				Sign in to access guest area
			</h2>

			<SignInButton />
		</div>
	);
}
