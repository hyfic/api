import { GraphQLSchema } from 'graphql';
import { Mutations } from './mutations';
import { Queries } from './queries';

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
