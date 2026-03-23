import { AsideMyProfile } from '@/components/sidebar/AsideMyProfile';
import { AsidePeople } from '@/components/AsidePeople';
import { ReactNode } from 'react';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
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
