// Require the library
const mongoose=require('mongoose');
// Connect to Database;
mongoose.connect('mongodb://localhost:27017/contact-list-db');
// Acquire the connection(to check if it is successfull)
const db=mongoose.connection;
// If error
db.on('error',console.error.bind(console,'error connection to db'));
// Up and running print the message
db.once('open',function(){
    console.log("Successfilly connected to db");
})