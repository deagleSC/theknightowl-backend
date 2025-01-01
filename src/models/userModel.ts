import mongoose, { Document, Schema } from "mongoose";
import { generateToken } from "../utils/jwt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.methods.generateToken = function (): string {
  return generateToken({
    userId: this._id,
    email: this.email,
  });
};

export default mongoose.model<IUser>("User", UserSchema);
