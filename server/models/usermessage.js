const mongoose=require('mongoose');

const MessageSchema=new mongoose.Schema({
    user:{
        type:String,
    },
    mobile:{
        type:String,
    },
    roomID:{
        type:String,   
    },
    // id:{
    //     type:String,
    // },
    message:{
        type:String,
    },
    
    
},{timestamps:true}
)

const Message=mongoose.model("Message",MessageSchema);
module.exports=Message;
