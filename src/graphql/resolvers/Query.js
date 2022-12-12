import Movie from "../../models/Movie";
const Query = {
  ping() {
    return "pong";
  },
  async getMovies() {
    const movies = await Movie.find();
    return movies;
  },
  async getMovieById(_, { _id }) {
    const movie = await Movie.findById(_id);
    return movie;
  },
};
export default Query;
