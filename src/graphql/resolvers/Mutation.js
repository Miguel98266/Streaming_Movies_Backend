import Movie from "../../models/Movie";
import User from '../../models/User';
import Rate from "../../models/Rate";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import config from '../../config'

const Mutation={
    async createMovie(_,{input}){
        const movie = await Movie.create(input);
        return movie;
    },
    async updateMovie(_,{ input, _id }){
        const movie = await Movie.findByIdAndUpdate(_id, input, { new: true });
        return movie;
    },
    async removeMovie(_, { _id }) {
        await Movie.findByIdAndRemove(_id);
        return await Movie.find();
      },
    async createUser(_,{input}){
        const hashed = await bcrypt.hash(input.password, 10);
        input.password = hashed;
        const user = await User.create(input);
        return user;
    },
    async updateUser(_,{ input, _id }){
        const user = await User.findByIdAndUpdate(_id, input, { new: true });
        return user;
    },
    async createRate(_,{input,_id}){
        const rate = await Rate.create(input);
        console.log(rate._id)
        const movie=await Movie.findById(_id)
        movie.rate=movie.rate.concat(rate._id)
        const movieUpdated=await Movie.findByIdAndUpdate(_id,movie, { new: true }).populate({ 
            path: 'rate',
            model: 'Rate',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        console.log(movieUpdated)
        return movieUpdated
    },
}

export default Mutation;