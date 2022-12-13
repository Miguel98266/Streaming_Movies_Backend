import Movie from "../../models/Movie";
import Rate from "../../models/Rate";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import config from '../../config'
import { mongo } from "mongoose";

const Query = {
  ping() {
    return "pong";
  },
  async getMovies() {
    const movies = await Movie.find().populate({ 
      path: 'rate',
      model: 'Rate',
      populate: {
          path: 'user',
          model: 'User'
      }
  })
    return movies;
  },
  async getMovieById(_, { _id }) {
    const movie = await Movie.findById(_id);
    return movie;
  },
  async getRateByMovie(_, { _id }) {
    console.log(_id)
    const rate = await Rate.find({"movie":mongo.ObjectId(_id)}).populate('user')
    return rate;
  },
  async getRateAvgByMovie(_, { _id }) {
    console.log(_id)
    const average =  await Rate.aggregate([
      { $match: { movie: mongo.ObjectId(_id) } },
      { $group: { _id: null, average: { $avg: '$rate' } } },
    ]);
    
    return average[0].average;
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
