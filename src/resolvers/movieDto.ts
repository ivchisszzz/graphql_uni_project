import { IsDate, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { getModelForClass, prop as Prop } from "@typegoose/typegoose";

import { GenreDto, GenreDtoBase } from "./genreDto";

@InputType()
export class MovieDto {
  @MaxLength(60)
  @Field()
  title: string;

  @MaxLength(300)
  @Field()
  description: string;

  @Field()
  releaseDate: Date;

  @MaxLength(30)
  @Field()
  director: string;

  @Field((type) => [GenreDtoBase])
  genres: [GenreDtoBase];
}

@InputType()
export class UpdateMovieDto {
  @MaxLength(60)
  @Field({ nullable: true })
  title?: string;

  @MaxLength(300)
  @Field({ nullable: true })
  description?: string;

  @IsDate()
  @Field({ nullable: true })
  releaseDate?: Date;

  @MaxLength(30)
  @Field({ nullable: true })
  director?: string;

  @Field((type) => [GenreDto], { nullable: true })
  genres?: [GenreDto];
}
