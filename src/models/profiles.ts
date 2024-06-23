import mongoose from 'mongoose';

export interface IProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  token: string;
  email: string;
  password: string;
  profile_image_link?: string;
  bio?: string;
}

export type ISignupProfile = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    bio: {
      type: String,
      default:
        "meiga e abusada, faço você se perder e quem foi que disse que eu estava apaixonada por você? eu só quero saber",
    },
    profile_image_link: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    },
  },
  { timestamps: true }
);
export const Profile = async () =>
  (await mongoose.models?.Profile) ||
  (await mongoose.model("Profile", ProfileSchema));
