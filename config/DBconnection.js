const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true });

const DBconnection=async()=>{
    try{
       await mongoose.connect(
            process.env.DATABASE_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    }
    catch(err){
        console.log(err)

    }
}
module.exports=DBconnection