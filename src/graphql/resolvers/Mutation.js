import Movie from "../../models/Movie";
import User from '../../models/User';
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
}

export default Mutation;