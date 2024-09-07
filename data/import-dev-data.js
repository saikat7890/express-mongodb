const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/mvieModel');
const { log } = require('console');
dotenv.config({path: './config.env'});

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB Connection Successful');
}).catch((error) => {
    console.log('Some error occured');
});

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

const deleteMovies = async ()=> {
    try {
        await Movie.deleteMany();
        console.log('Data successfully deleted');        
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}
const importMovies = async () => {
    try {
        await Movie.create(movies);
        console.log('Data successfully imported');
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}
// console.log(process.argv);
if(process.argv[2] === '--import'){
    importMovies();
}
if(process.argv[2] === '--delete'){
    deleteMovies();
}

//cmd line query format
//node .\data\import-dev-data.js --import
//node .\data\import-dev-data.js --delete
