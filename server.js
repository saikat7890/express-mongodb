const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    // console.log(conn);
    console.log('DB Connection Successful');
}).catch((error) => {
    console.log('Some error has occured');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
