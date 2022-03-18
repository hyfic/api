import { client } from '../redis';

// { "socketID": { roomId: "some room Id", userId: "user id" } }
export const setData = (socketId: string, roomId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    client
      .set(socketId, JSON.stringify({ roomId, userId }))
      .then(resolve)
      .catch(() => reject('Failed to set data'));
  });
};

export const getData = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client
      .get(socketId)
      .then((reply) => {
        if (!reply) throw new Error('Failed to get data');

        const { roomId, userId } = JSON.parse(reply);

        resolve({
          socketId,
          roomId,
          userId,
        });
      })
      .catch(() => {
        reject(`Failed to get data for ${socketId}`);
      });
  });
};

export const deleteData = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client
      .del(socketId)
      .then(resolve)
      .catch(() => {
        reject(`Failed to delete with key ${socketId}`);
      });
  });
};
