import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { Logout } from '@/services/auth';

export default async function HomePage() {
  const session = await auth();
  return (
    <div>
      {session?.user && (
        <form action={Logout} className="w-full flex justify center">
          <Button>Logout</Button>
        </form>
      )}
    </div>
  );
}
