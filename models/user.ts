import mongoose, { Schema } from "mongoose";

export interface IUserType {
  _id?: string;
  userName: string;
  userEmail:string;
  userPassword:string;
  role?:string;
  createdAt?:string;
  updatedAt?:string;
}

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
