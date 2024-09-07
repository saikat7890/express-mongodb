const mongoose = require('mongoose')
const validator= require("validator");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        unique: true,
        trim: true,
        maxLength: [100, "Movie name length should be under 100 charecters!"],
        minLength: [5, "Movie name length should be over 5 charecters!"],
        validate: [validator.isAlpha, "Name should only contain alphabate!"],
    },
    description: {
        type: String,
        required: [true, 'Description is required field'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required field']
    },
    ratings: {
        type: Number,
        // max: [1, "Ratings should be over 1!"],
        // min: [10, "Ratings should be under 10!"],
        validate: {
            validator: function(value) {
                return value>=1 && value<=10;
            },
            message: "Ratings {VALUE} should be above 1 and below 10"
        }
    },
    totalRatings: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required field']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String],
        required: [true, 'Genres is required field'],
        // enum: {
        //     values: ["Action", "Adventure", "Sci-fi", "Thriller", "Crime", "Drama", "Comedy", "Romance", "Biography"],
        //     message: "This genre does not exist"
        // }   
    },
    directors: {
        type: [String],
        required: [true, 'Directors is required field']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    actors: {
        type: [String],
        required: [true, 'Actor is required!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']

    }
});
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;