import SideNavigation from "@/components/account/SideNavigation";

export default function Layout({ children }: LayoutProps<"/account">) {
	return (
		<div className="grid h-auto grid-cols-1 gap-6 md:h-full md:grid-cols-[16rem_1fr] md:gap-8">
			<SideNavigation />
			<div className="min-w-0">{children}</div>
		</div>
	);
}
