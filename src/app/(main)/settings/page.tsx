import { getUserByEmail } from "@/api/user.queries";
import { SettingsPage } from "@/components/pages/settings-page";
import { auth } from "@/lib/auth";

const Settings = async () => {
	const session = await auth();
	const user = await getUserByEmail(session?.user?.email ?? "");

	return <SettingsPage currentUser={user} />;
};

export default Settings;
