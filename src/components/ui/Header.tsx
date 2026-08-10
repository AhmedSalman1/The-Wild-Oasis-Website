import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
	return (
		<header className="border-b border-primary-900 px-4 sm:px-8 py-3 sm:py-5">
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
}

export default Header;
