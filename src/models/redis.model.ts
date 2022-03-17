import { client } from '../redis';

// { "socketID": { roomId: "some room Id", userId: "user id" } }
export const setData = (socketId: string, roomId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    client.set(
      socketId,
      JSON.stringify({ roomId, userId }),
      (_: any, reply: unknown) => {
        if (reply) resolve(reply);
        else reject('Failed to set data');
      }
    );
  });
};

export const getData = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client.get(socketId, (err: any, reply: string) => {
      if (err || !reply) {
        reject(`Failed to get data for ${socketId}`);
        return;
      }

      const { roomId, userId } = JSON.parse(reply);

      resolve({
        socketId,
        roomId,
        userId,
      });
    });
  });
};

export const deleteData = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client.del(socketId, (_: any, reply: unknown) => {
      if (reply) resolve(reply);
      else reject(`Failed to delete with key ${socketId}`);
    });
  });
};
