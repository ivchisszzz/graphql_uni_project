import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { GenreModel } from "../entity/genre";
import { Movie, MovieModel } from "../entity/movie";
import { MovieDto, UpdateMovieDto } from "./movieDto";

@Resolver()
export class MovieResolver {
  @Query((returns) => [Movie])
  async movieList(): Promise<Movie[]> {
    return await MovieModel.find({});
  }

  @Query((returns) => Movie)
  async findMovieById(@Arg("_id") _id: string): Promise<Movie[]> {
    return await MovieModel.findById(_id);
  }

  @Mutation((returns) => Movie)
  async createMovie(@Arg("data") data: MovieDto): Promise<Movie> {
    const genres = [];
    data.genres.forEach((element) => {
      const newGenre = new GenreModel(element);
      newGenre.save();
      genres.push(newGenre);
    });
    const newMovie = new MovieModel({ ...data, genres });
    await newMovie.save();
    return newMovie;
  }

  @Mutation((returns) => Movie)
  async deleteMovie(@Arg("_id") _id: string): Promise<Movie> {
    const deltedMovie = await MovieModel.findByIdAndRemove(_id);
    return deltedMovie;
  }

  @Mutation((returns) => Movie)
  async editMovie(
    @Arg("_id") _id: string,
    @Arg("data") data: UpdateMovieDto
  ): Promise<Movie> {
    data.genres.forEach((element) => {
      const genreModel = GenreModel.findByIdAndUpdate(element._id);
    });
    return MovieModel.findByIdAndUpdate(_id, data, { new: true });
  }
}
