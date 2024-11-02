const mongoose= require("mongoose");
const nodemailer= require("nodemailer");

const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware for sending emails 

fileSchema.post("save", async function(doc){
    try{
   console.log("DOC",doc)

   //transporter
   //shift to config folder
   let transporter= nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,

    },
   });

   //send mail

   let info = await transporter.sendMail({
    from: 'from vscode-by sakshi',
    to:doc.email,
    subject:"new file uploaded on cloudinary",

    html:`<h2>hello jee</h2> <p> file uploaded view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
   })

   console.log("info", info);

    }catch(error){
      console.error(error);
    }
})

const File= mongoose.model("File", fileSchema);
module.exports= File;