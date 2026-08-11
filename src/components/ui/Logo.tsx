import Image from "next/image";
import Link from "next/link";

function Logo() {
	return (
		<Link href="/" className="z-10 flex items-center gap-2 sm:gap-4">
			<Image
				src="/logo.png"
				height="60"
				width="60"
				alt="The Wild Oasis logo"
				loading="eager"
			/>
			<span className="text-primary-100 hidden text-lg font-semibold sm:inline sm:text-xl">
				The Wild Oasis
			</span>
		</Link>
	);
}

export default Logo;
