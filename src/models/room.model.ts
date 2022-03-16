import { CreateRoomArgs } from '../utils/types';
import { uuid } from '../utils/uuid';
import { prismaClient } from './prisma';

export const createRoom = (data: CreateRoomArgs, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.room
      .create({
        data: {
          ...data,
          creatorId: userId,
          roomId: uuid(),
        },
      })
      .then(resolve)
      .catch(() => {
        reject('Failed to create room');
      });
  });
};

export const getRooms = () => {
  return new Promise((resolve, reject) => {
    prismaClient.room
      .findMany({
        where: {
          isPrivate: false, // this actually works
        },
        include: {
          creator: true,
          joinedUsers: true,
          _count: {
            select: {
              joinedUsers: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(() => {
        reject('Failed to get rooms');
      });
  });
};

export const deleteRoom = (roomId: string, userId: string) => {
  return new Promise(async (resolve, reject) => {
    const room: any = await getRoom(roomId);
    if (room?.creatorId !== userId) {
      reject(`You don't have permission to delete room ${roomId}`);
      return;
    }

    prismaClient.room
      .delete({ where: { roomId } })
      .then(() => resolve(`deleted room ${roomId} successfully`))
      .catch(() => reject('Failed to delete room'));
  });
};

export const getRoom = (roomId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.room
      .findUnique({
        where: { roomId },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
          joinedUsers: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
          _count: {
            select: {
              joinedUsers: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(() => reject(`Failed to find room with id ${roomId}`));
  });
};

export const getSearchResult = (searchQuery: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.room
      .findMany({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { description: { contains: searchQuery } },
            { roomId: searchQuery },
            { creator: { email: { contains: searchQuery } } },
          ],
          isPrivate: false,
        },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
          joinedUsers: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
          _count: {
            select: {
              joinedUsers: true,
            },
          },
        },
      })
      .then(resolve)
      .catch(() => reject(`Failed to search for ${searchQuery}`));
  });
};

// dev

export const getAllRoomData = (roomId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.room
      .findUnique({
        where: { roomId },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
          joinedUsers: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
        },
      })
      .then(resolve)
      .catch((err: any) => {
        console.log(err);
      });
  });
};
