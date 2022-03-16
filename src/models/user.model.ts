import { LoginArgs, RegisterArgs, UpdateArgs, User } from '../utils/types';
import { getRoom } from './room.model';
import { prismaClient } from './prisma';
import bcrypt from 'bcrypt';

export const registerUser = (data: RegisterArgs): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      .then(resolve)
      .catch((err: any) => {
        if (err.code === 'P2002') {
          reject(`${data.email} already exist`);
        }
        reject('Failed to register user');
      });
  });
};

export const loginUser = (data: LoginArgs): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const user = await findUser(data.email).catch(reject);
    if (!user) return;

    if (!user.password) return; // never going to happen anyway :)

    bcrypt.compare(data.password, user.password, (err, res) => {
      if (err) return reject('Failed to validate password');
      if (!res) return reject('Invalid password');
      resolve(user);
    });
  });
};

export const updateUser = (data: UpdateArgs): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const user = await findUser(data.ogEmail).catch(reject);
    if (!user) return;

    if (data.isNewPassword) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    prismaClient.user
      .update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          profile: data.profile,
          password: data.password,
        },
      })
      .then(resolve)
      .catch((err: any) => {
        console.log(err);
        reject('Failed to update user');
      });
  });
};

export const findUser = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    prismaClient.user
      .findUnique({ where: { email } })
      .then((user: User) => {
        if (!user) {
          reject(`Failed to find user with email ${email}`);
          return;
        }
        resolve(user);
      })
      .catch(() => {
        reject(`Failed to find user with email ${email}`);
      });
  });
};

export const findUserById = (userId: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    prismaClient.user
      .findUnique({ where: { id: userId } })
      .then((user: User) => {
        if (!user) {
          reject(`Failed to find user with email ${userId}`);
          return;
        }
        resolve(user);
      })
      .catch(() => {
        reject(`Failed to find user with email ${userId}`);
      });
  });
};

// room

export const joinRoom = (roomId: string, userId: number) => {
  return new Promise(async (resolve, reject) => {
    const room: any = await getRoom(roomId);

    prismaClient.user
      .update({
        where: { id: userId },
        data: {
          joinedRooms: {
            set: { roomId },
          },
        },
      })
      .then(() => resolve(room))
      .catch((err: any) => {
        console.log(err);
        reject(`Failed to join room ${roomId}`);
      });
  });
};

export const leaveRoom = (roomId: string, userId: number) => {
  return new Promise(async (resolve, reject) => {
    const room: any = await getRoom(roomId);

    prismaClient.user
      .update({
        where: { id: userId },
        data: {
          joinedRooms: {
            disconnect: { roomId },
          },
        },
      })
      .then(() => resolve(`Left from '${room?.title}' successfully`))
      .catch((err: any) => {
        console.log(err);
        reject(`Failed to leave room ${roomId}`);
      });
  });
};
