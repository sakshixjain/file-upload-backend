const File= require("../models/File");

//localfileUpload -> handlr function

exports.localFileUpload = async(req,res)=>{
    try{
 //fetch krna h file ko 
 const file= req.files.file;
 console.log("file aagyi h ->", file);

 let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
 console.log("PATH-> ",path);

 file.mv(path, (err)=>{
    console.log(err);
 });
 res.json({
    success:true,
    message:"local file ulploaded successfully",
 });
    }catch(error){
 console.log(error);
    }
}