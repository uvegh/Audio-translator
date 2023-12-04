const mongoose =require('mongoose')
const Schema=mongoose.Schema

const UserSchema =new Schema({
    email:{type:String},
    phone:{type:String},
    transcriptions:[{type:Schema.Types.ObjectId,ref:"transcriptions"}],
    full_name:{type:String},
    access_token:{type:String},
    refresh_token:{type:String},
    password:{type:String}
},{timeStamp:true})

const User =mongoose.model('users',UserSchema)
module.exports=User