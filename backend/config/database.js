const mongoose = require('mongoose');



exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {console.log("DataBase connected")}).catch(err => {console.log(err)});
}
