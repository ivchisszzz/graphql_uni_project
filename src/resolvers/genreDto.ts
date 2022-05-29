import { MaxLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Field, InputType } from "type-graphql";
import { GenreModel } from "../entity/genre";

@InputType()
export class GenreDtoBase {
  @MaxLength(20)
  @Field()
  genreName: string;
}

@InputType()
export class GenreDto extends GenreDtoBase {
  @Field()
  _id: ObjectId;
}
