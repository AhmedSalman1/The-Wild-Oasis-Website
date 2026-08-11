import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
	return (
		<header className="border-primary-900 border-b px-4 py-3 sm:px-8 sm:py-5">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
}

export default Header;
