import { UserInputError } from 'apollo-server-core';
import { generateToken } from '../utils/jwt';
import { LoginArgs, RegisterArgs, UpdateArgs } from '../utils/types';
import {
  findUser,
  findUserById,
  loginUser,
  registerUser,
  updateUser,
} from '../models/user.model';

export const registerController = async (args: RegisterArgs) => {
  const user = await registerUser(args).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const loginController = async (args: LoginArgs) => {
  const user = await loginUser(args).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const updateController = async (args: UpdateArgs) => {
  const user = await updateUser(args).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const getUserController = async (email: string) => {
  const user = await findUser(email).catch((err) => {
    throw new UserInputError(err);
  });

  return user;
};

export const getUserByIdController = async (userId: number) => {
  const user: any = await findUserById(userId).catch((err) => {
    throw new UserInputError(err);
  });

  return user;
};
