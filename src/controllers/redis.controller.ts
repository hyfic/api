import { deleteData, getData, setData } from '../models/redis.model';

export const saveUserDataController = async (
  socketId: string,
  roomId: string,
  userId: number
) => {
  await setData(socketId, roomId, userId).catch(console.log);
};

export const getAndDeleteDataController = async (
  socketId: string
): Promise<{ socketId: string; roomId: string; userId: number }> => {
  const data: any = await getData(socketId).catch(console.log);
  await deleteData(socketId).catch(console.log);
  return data;
};

export const getDataController = async (
  socketId: string
): Promise<{ socketId: string; roomId: string; userId: number }> => {
  const data: any = await getData(socketId).catch(console.log);
  return data;
};
