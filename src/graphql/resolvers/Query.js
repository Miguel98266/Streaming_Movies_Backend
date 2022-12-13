import Movie from "../../models/Movie";
import Rate from "../../models/Rate";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import config from '../../config'

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
  async getRateByMovie(_, { _id }) {
    const rate = await Rate.find({"movie":_id}).populate("movies");
    return rate;
  },
  async login(_, { email,password}) {
    if (!email || !password) {
      return ({
        isValid:false,
        msg: "Enter email and password"
      });
    }
    const user = await User.findOne({email});
    if (!user) {
      return ({
         isValid:false,
         msg: "Enter email and password"
      });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return ({
         isValid:false,
         msg: "Invalid credentials"
      });
    }
    const payload = {
      id: user.id
    };
    const token = jwt.encode(payload, config.jwtSecret);
    return ({
      isValid:true,
      msg: "Successful login",
      token,
    });
  },
};
export default Query;
