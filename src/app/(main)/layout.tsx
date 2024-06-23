import { AsidePeople } from '@/components/AsidePeople';
import { auth } from '@/lib/auth';

const MainLayout = async () => {
  const session = await auth();
  return (
    <>
      <AsidePeople />
    </>
  );
};

export default MainLayout;
