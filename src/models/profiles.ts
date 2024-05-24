import mongoose from "mongoose";
export interface IProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_image_link?: string;
  bio?: string;
}

export type ProfileRequest = {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  profile_image_link?: string;
};

const ProfileSchema = new mongoose.Schema<IProfile>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profile_image_link: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    },
  },
  { timestamps: true }
);
export const Profile =
  mongoose.models?.Profile || mongoose.model("Profile", ProfileSchema);
