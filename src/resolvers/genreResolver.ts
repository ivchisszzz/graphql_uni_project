import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Genre, GenreModel } from "../entity/genre";
import { GenreDtoBase } from "./genreDto";

@Resolver()
export class GenreResolver {
  @Query((returns) => [Genre])
  async genres(): Promise<Genre[]> {
    return await GenreModel.find({});
  }

  @Query((returns) => Genre)
  async findGenreById(@Arg("_id") _id: string): Promise<Genre[]> {
    return await GenreModel.findById(_id);
  }

  @Mutation((returns) => Genre)
  async createGenre(@Arg("data") data: GenreDtoBase): Promise<Genre> {
    const genre = new GenreModel(data);
    await genre.save();
    return genre;
  }

  @Mutation((returns) => Genre)
  async deleteGenre(@Arg("_id") _id: string): Promise<Genre> {
    const genreToDelete = await GenreModel.findByIdAndRemove(_id);
    return genreToDelete;
  }

  @Mutation((returns) => Genre)
  async editGenre(
    @Arg("_id") _id: string,
    @Arg("data") data: GenreDtoBase
  ): Promise<Genre> {
    return GenreModel.findByIdAndUpdate(_id, data, { new: true });
  }
}
