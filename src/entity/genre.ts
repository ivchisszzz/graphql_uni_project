import { ObjectType, Field } from "type-graphql";
import {
  prop as Prop,
  getModelForClass,
  Severity,
  modelOptions,
} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Genre {
  @Field()
  readonly _id: ObjectId;

  @Prop({ required: true })
  @Field()
  genreName: string;
}

export const GenreModel = getModelForClass(Genre);
