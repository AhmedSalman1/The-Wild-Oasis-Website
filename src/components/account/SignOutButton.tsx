import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/lib/actions";

function SignOutButton() {
	return (
		<form action={signOutAction}>
			<button className="hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex w-full items-center justify-center gap-2 px-3 py-3 font-semibold whitespace-nowrap transition-colors hover:cursor-pointer md:justify-start md:gap-4 md:px-5">
				<ArrowRightStartOnRectangleIcon className="text-primary-600 h-5 w-5 shrink-0" />
				<span className="hidden sm:inline">Sign out</span>
			</button>
		</form>
	);
}

export default SignOutButton;
