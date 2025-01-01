import User, { IUser } from "../models/userModel";

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const deleteUserById = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
