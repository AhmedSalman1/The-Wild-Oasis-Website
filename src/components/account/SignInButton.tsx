import { signInAction } from "@/lib/actions";
import Image from "next/image";

function SignInButton() {
	return (
		<form action={signInAction}>
			<button className="border-primary-300 flex w-full max-w-xs items-center justify-center gap-4 border px-6 py-3 text-base font-medium hover:cursor-pointer sm:w-auto sm:max-w-none sm:gap-6 sm:px-10 sm:py-4 sm:text-lg">
				<Image
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
					className="h-5 w-5 sm:h-6 sm:w-6"
				/>
				<span className="whitespace-nowrap">Continue with Google</span>
			</button>
		</form>
	);
}

export default SignInButton;
