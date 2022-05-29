import { buildSchema } from "type-graphql";
import { GenreResolver } from "./resolvers/genreResolver";
import { TypegooseMiddleware } from "./typegoose-midleware";
import * as path from "path";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
import { MovieResolver } from "./resolvers/movieResolver";

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [GenreResolver, MovieResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });
  return schema;
};
