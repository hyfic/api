import { GraphQLObjectType } from 'graphql';
import { GET_USER } from './user.query';
import {
  GET_ROOM,
  GET_ROOMS,
  GET_ROOM_DATA,
  GET_SEARCH_RESULT,
} from './room.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getUser: GET_USER,

    getRoom: GET_ROOM,
    getRooms: GET_ROOMS,
    getRoomData: GET_ROOM_DATA,
    searchRoom: GET_SEARCH_RESULT,
  }),
});
