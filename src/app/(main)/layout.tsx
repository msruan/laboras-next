import type { ReactNode } from "react";
import { AsidePeople } from "@/components/AsidePeople";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<AsidePeople />
			<main className="sm:ml-28 xl:mx-72">{children}</main>
			<AppSidebar />
		</div>
	);
}
