const mongoose =require("mongoose");

const bookSchema= new mongoose.Schema({
    BookName:{
        type:String,
        required:true   
    },
    BookTitle:{
        
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    sellingPrice:{
        type:String,
        required:true
    },
    PublishedDate:{
        type:String
    }
},
{
    timestamps:true
}
);

const Book =mongoose.model("books",bookSchema);
module.exports={Book};