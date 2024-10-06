const mongoose = require("mongoose");
require("dotenv").config();

exports.connect =()=>{
  mongoose.connect("mongodb+srv://sakshi32:n7eDc1UONRC1clwL@cluster0.aqnor.mongodb.net/FileuploadDB",{
   useNewUrlParser:true,
   useUnifiedTopology:true,  
  })
  .then(console.log("DB connection is successfull"))
  .catch((error)=>{
    console.log("DB connection issue");
    console.error(error);
    process.exit(1);
  });
};