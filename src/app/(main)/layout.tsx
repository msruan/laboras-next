import type { ReactNode } from "react";
import { AsidePeople } from "@/components/AsidePeople";
import { AsideMyProfile } from "@/components/sidebar/AsideMyProfile";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AsidePeople />
      <main className="ml-72 max-sm:mb-1 max-md:m-0 max-xl:ml-24 xl:mr-72">
        {children}
      </main>
      <AsideMyProfile />
    </div>
  );
}
