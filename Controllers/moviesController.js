const { log } = require('console');
const Movie = require('../Models/mvieModel')

const getAllMovies = async (req, res) => {
    try {
        // console.log(req.query);
        // const movies = await Movie.find(req.query);

        /*************Mongoose 6.0 or less****************
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        const queryObj = {...req.query};  //Creating shallow copy of req.query
        excludeFields.forEach((ele) => {
            delete queryObj[ele];
        })
        console.log(queryObj);
        const movies = await Movie.find(queryObj);
        *************************************************/
        //Filtering
        let queryStr = JSON.stringify(req.query);
        //This format- find({duration: {$gte: 90}, ratings: {$gte: 5}, price: {$lte: 100}})
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryStr);

        //Here movie is a result array from find()
        // const movies = await Movie.find(queryObj);
        
        //Here query is a Query object from find()
        let query = Movie.find(queryObj);
        
        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-ratings');
        }
        const movies = await query;
            
        // const movies = await Movie.find()
        //             .where('duration')
        //             .gte(req.query.duration)
        //             .where('ratings')
        //             .gte(req.query.ratings)
        //             .where('price')
        //             .lte(req.query.price)
        
        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
};
const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                movie
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}
const getMovie = async (req, res) => {
    try {
        // const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}
const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}
const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    getMovie, 
    getAllMovies, 
    createMovie, 
    updateMovie, 
    deleteMovie, 
};