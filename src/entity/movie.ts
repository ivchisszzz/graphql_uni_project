import { ObjectType, Field } from "type-graphql";
import {
  getModelForClass,
  modelOptions,
  prop as Prop,
  Severity,
} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Genre } from "./genre";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Movie {
  @Field()
  _id: ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field()
  releaseDate: Date;

  @Prop({ required: true })
  @Field()
  director: string;

  @Field((type) => [Genre])
  @Prop({ default: [] })
  genres: Genre[];
}

export const MovieModel = getModelForClass(Movie);
