const mongoose =require('mongoose')
const Schema=mongoose.Schema

const TranscriptionsSchema =new Schema({
    user:{type:Schema.Types.ObjectId,ref:"users",required:true},

    
},{timeStamp:true})

const Transcription =mongoose.model('users',TranscriptionsSchema)
module.exports=Transcription