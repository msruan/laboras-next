import { apiURL } from "@/config/api";
import { IProfile } from "@/models/profile.model";

export async function getUsers(): Promise<IProfile[]> {
  const res = await fetch(`${apiURL}/profiles`, {
    method: "GET",
    next: { tags: ["all-posts"] },
  });

  const data: IProfile[] = await res.json();
  return data;
}

export async function getUserByEmail(email: string): Promise<IProfile> {
  const res = await fetch(`${apiURL}/profiles/email/${email}`, {
    method: "GET",
    next: { tags: [`user-${email}`] },
  });

  const data: IProfile = await res.json()
  return data;
}
