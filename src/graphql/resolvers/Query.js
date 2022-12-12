import Movie from '../../models/Movie'
const Query = {
    ping() {
      return "pong";
    },
    async getMovies() {
        const movies = await Movie.find();
        return movies;
      },
}
export default Query;