import { GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import { RoomDataType, RoomType } from '../typeDefs/room.typeDef';
import {
  validateRoomId,
  validateSearchQuery,
} from '../validators/room.validator';
import {
  getRoomController,
  getRoomDataController,
  getRoomsController,
  searchRoomController,
} from '../../controllers/room.controller';

export const GET_ROOMS = {
  type: new GraphQLList(RoomType),
  args: {
    page: { type: GraphQLInt },
  },
  async resolve(_: any, requestArgs: any) {
    let page: number = requestArgs?.page ? requestArgs.page : 0;
    return await getRoomsController(page);
  },
};

export const GET_ROOM = {
  type: RoomType,
  args: {
    roomId: { type: GraphQLString },
  },
  async resolve(_: any, requestArgs: any) {
    const roomId = validateRoomId(requestArgs);
    return await getRoomController(roomId);
  },
};

export const GET_SEARCH_RESULT = {
  type: new GraphQLList(RoomType),
  args: {
    query: { type: GraphQLString },
  },
  async resolve(_: any, requestArgs: any) {
    const searchQuery = validateSearchQuery(requestArgs);
    return await searchRoomController(searchQuery);
  },
};

// dev
export const GET_ROOM_DATA = {
  type: RoomDataType,
  args: {
    roomId: { type: GraphQLString },
  },
  async resolve(_: any, requestArgs: any) {
    const roomId = validateRoomId(requestArgs);
    return await getRoomDataController(roomId);
  },
};
