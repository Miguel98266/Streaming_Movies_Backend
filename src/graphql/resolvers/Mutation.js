import Movie from "../../models/Movie";

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
}

export default Mutation;