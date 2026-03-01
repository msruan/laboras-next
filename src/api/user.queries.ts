import { EntityNotFoundException } from "@/exceptions";
import { logger } from "@/lib/logger";
import { connectToDb } from "@/lib/utils";
import { IPost, PostDB } from "@/models/post.model";
import { IProfile, ProfileDB } from "@/models/profile.model";

export async function getUsers(): Promise<IProfile[]> {
  try {
    await connectToDb();

    const users = await ProfileDB.find();

    return JSON.parse(JSON.stringify(users));
  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}

export async function getUserByEmail(email: string): Promise<IProfile> {
  try {
    await connectToDb();

    const user = await ProfileDB.findOne({ email: email });
    if (!user) {
      throw new EntityNotFoundException("User not found")
    }

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}

export async function getProfileById(id: string): Promise<IProfile>{
   try {
    await connectToDb();

    const user = await ProfileDB.findById(id);
    logger.trace(`The requested id profile is ${id}`);
    
    if (!user) {
      throw new EntityNotFoundException("User not found")
    }

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}

export async function getProfileByUsername(username: string): Promise<{user: IProfile, posts: IPost[]}>{
    try {
    await connectToDb();
    logger.trace(`The received username is ${username}`);

    const user: IProfile | null = await ProfileDB.findOne({ username: username });
    if (!user) throw new EntityNotFoundException("User not found!");
    const posts: IPost[] = await PostDB.find({ user_id: user._id });

    return JSON.parse(JSON.stringify({
      user,
      posts: posts.filter((post) => post.linked_to === null).reverse(),
    }));

  } catch (err) {
    logger.error(String(err));
    throw err;
  }
}