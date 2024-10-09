const File= require("../models/File");
const cloudinary= require("cloudinary").v2;
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

function isFileTypeSupported(type,supportedTypes){
   return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
   const options={folder};
   console.log("temp file path",file.tempFilePath); 

   if(quality){
      options.quality=quality; 
   }

   options.resource_type= "auto";
  return await cloudinary.uploader.upload(file.tempFilePath,options); 
}


//imasge upload ka handler 


exports.imageUpload = async(req,res)=>{
   try{
  //data fetch 
  const {name,tags,email}= req.body;
  console.log(name,tags,email);

  const file= req.files.imageFile;
  console.log(file);

  //validation 
  const supportedTypes= ["jpg","jpeg","png"];
  const fileType= file.name.split('.')[1].toLowerCase();
  console.log("File Type: ",fileType);
  if(!isFileTypeSupported(fileType,supportedTypes)){
   return res.status(400).json({
      success:false,
      message:"file format is not supported",
   })
  }

  //file format supported h
  const response = await  uploadFileToCloudinary(file,"firstFolder"); 
console.log(response);
  //db mai entry save krni h

  const fileData= await File.create ({
   name,
   tags,
   email,
   imageUrl:response.secure_url,
  })
   
res.json({
   success:true,
   imageUrl:response.secure_url,
   message:"image is successfully uploaded",
})

   }catch(error){
console.error(error);
res.status(400).json({
   success:false,
   messgae:"failed something error"
})
   }
}


///video upload ka handler

exports.videoUpload= async (req,res)=>{
   try{
      const {name,tags,email}= req.body;
      console.log(name,tags,email);

      const file= req.files.videoFile;

      //validation
      const supportedTypes= ["mp4","mov"];
  const fileType= file.name.split('.')[1].toLowerCase();
  console.log("File Type: ",fileType);

  // ToDO add aupper limit of 5mb 
  if(!isFileTypeSupported(fileType,supportedTypes)){
   return res.status(400).json({
      success:false,
      message:"file format is not supported",
   })
  }

    //file format supported h
    const response = await  uploadFileToCloudinary(file,"firstFolder"); 
    console.log(response);

      //db mai entry save krni h

      const fileData= await File.create ({
         name,
         tags,
         email,
         imageUrl:response.secure_url,
        })
         
      res.json({
         success:true,
         imageUrl:response.secure_url,
         message:"video is successfully uploaded",
      })

      
   }catch(error){
      console.error(error);
      res.status(400).json({
         success:false,
         messgae:"failed something error"
      })
   }
}



//image reducer upload ka handler

exports.imageReduceUpload=async (req,res)=>{
   try{
      const {name,tags,email}= req.body;
      console.log(name,tags,email);
    
      const file= req.files.imageFile;
      console.log(file);
    
      //validation 
      const supportedTypes= ["jpg","jpeg","png"];
      const fileType= file.name.split('.')[1].toLowerCase();
      console.log("File Type: ",fileType);
      if(!isFileTypeSupported(fileType,supportedTypes)){
       return res.status(400).json({
          success:false,
          message:"file format is not supported",
       })
      }
    
      //file format supported h
      const response = await  uploadFileToCloudinary(file,"firstFolder",90); 
    console.log(response);
      //db mai entry save krni h
    
      const fileData= await File.create ({
       name,
       tags,
       email,
       imageUrl:response.secure_url,
      })
       
    res.json({
       success:true,
       imageUrl:response.secure_url,
       message:"image is successfully uploaded",
    })
    
   }catch(error){
      console.error(error);
      res.status(400).json({
         success:false,
         messgae:"failed something error"
      }) 
   }
}