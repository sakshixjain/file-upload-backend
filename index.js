//app create
const express= require("express");
const app= express();

//port find rna h
require("dotenv").config();
const PORT= process.env.PORT || 4000;

//middle ware add krne h
app.use(express.json());
const fileupload= require("express-fileupload");
app.use(fileupload());

//db se connect
const db= require("./config/Database");
db.connect();
//cloud se connect
const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna h
const Upload= require("./routes/Fileupload");
app.use('/api/v1/upload',Upload);

//server activate krna h
app.listen(PORT,()=>{
    console.log(`App is running successfully at ${PORT} port`);
})


