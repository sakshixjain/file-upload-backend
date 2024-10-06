const express= require("express");

const router= express.Router();

const {imageUpload, videoUpload, imageReduceUpload, localFileUpload}=require("../controller/fileupload");

//api route
router.post("/localFileUpload",localFileUpload);

module.exports=router;