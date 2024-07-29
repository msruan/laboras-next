import { AsideMyProfile } from '@/components/AsideMyProfile/AsideMyProfile';
import { AsidePeople } from '@/components/AsidePeople';

import type { Metadata } from "next";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  return (
    <div>
      <AsidePeople />
      <main className="ml-72 max-xl:ml-24 xl:mr-72 max-md:m-0 max-sm:mb-1">
        {children}
      </main>
      <AsideMyProfile />
    </div>
  );
}
