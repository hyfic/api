import { UserInputError } from 'apollo-server-core';
import { CreateRoomArgs } from '../../utils/types';

export const validateCreateRoomArgs = (
  args: CreateRoomArgs
): CreateRoomArgs => {
  if (
    !args.title ||
    !args.description ||
    !args.picture ||
    typeof args.isPrivate == 'undefined'
  ) {
    throw new UserInputError('required fields not found');
  }

  return args;
};

export const validateRoomId = (args: any): string => {
  if (!args.roomId) {
    throw new UserInputError('Room Id is not provided');
  }

  return args.roomId;
};

export const validateSearchQuery = (args: any): string => {
  if (!args.query) {
    throw new UserInputError('Search query is not provided');
  }

  return args.query;
};
