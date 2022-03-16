import { Server as SocketServer } from 'socket.io';
import { leaveRoomController } from '../controllers/room.controller';
import { AppSocket, ClearChat, JoinRoom, Message } from './types';
import { botMessage } from './utils';
import { getUserByIdController } from '../controllers/user.controller';
import {
  getAndDeleteDataController,
  getDataController,
  saveUserDataController,
} from '../controllers/redis.controller';

export const joinRoom = (socket: AppSocket, data: JoinRoom) => {
  saveUserDataController(socket.id, data.roomId, data.sender.userId);

  socket.emit(
    'message',
    botMessage(`Welcome ${data.sender.name} to ${data.roomId}`)
  );

  socket.broadcast
    .to(data.roomId)
    .emit('message', botMessage(`${data.sender.name} has joined the gang`));

  socket.join(data.roomId);
};

export const message = async (socket: AppSocket, data: Message) => {
  socket.emit('message', data);
  const { roomId } = await getDataController(socket.id);
  socket.broadcast.to(roomId).emit('message', data);
};

export const leaveRoom = (socket: AppSocket) => {
  getAndDeleteDataController(socket.id).then(({ roomId, userId }) => {
    leaveRoomController(roomId, userId);
    getUserByIdController(userId).then((userData) => {
      socket.broadcast
        .to(roomId)
        .emit('message', botMessage(`${userData.name} has left the chat`));
    });
  });
};

export const clearChat = (io: SocketServer, data: ClearChat) => {
  io.to(data.roomId).emit('clearChat');
};

export const deleteRoom = (socket: AppSocket) => {
  socket.broadcast.emit('leaveRoom', 'Host deleted this room');
};
