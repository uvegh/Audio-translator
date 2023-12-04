const express=require('express')
const app=express.Router()
const bcrypt=require('bcrypt')


app.route('/register').post(async(req,res)=>{
    let found_user=""
    const {email,password}=req.body
    console.log(email,password)
    if(!email||!password){
        return res.status(400).json({
            status:400,
            msg:"Missing request"
        })
    }

    try{
found_user= await User.find({
    "email":email,
    "password":password
})

if(!found_user) return res.status(401).json({ msg: 'Invalid credentials' })
const match=await bcrypt.compare(password,found_user.password)
if(match){
    const data = {
        id: found_user._id,
        email: found_user.email,
        phone: found_user.phone,
        full_name:found_user.full_name
      }
      res.status(200).json({msg:"success",data:data})
}else {
    res.status(401).json({ msg: 'Invalid credentials' })
  }
    } 
    catch(err){
        res.status(500).json({ msg: 'Something went wrong' })
    }

})


app.route('/login').post(async (req, res) => {
    const { password, email } = req.body
  
    if (!req.body) return res.status(400).json({ msg: 'All info are required' })
    // check for duplicates in database
    const check_duplicates = await Patient.findOne({ email }).exec()
    if (check_duplicates) return res.status(409).json({ msg: 'Already exists' })
  
    try {
      // encrypt password
      const hashed_password = await bcrypt.hash(password, 10)
  
      // Created & store new admin
      const new_user = await Patient.create({
        full_name: req?.body?.full_name,
        
        // avatar: req?.body?.avatar,
        // gender: req?.body?.gender.toLowerCase(),
        password: hashed_password,
        email: email,
       
        phone: req?.body?.phone,
       
      })
      res.status(201).json({ msg: 'New user  created', data: new_user })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })
  


module.exports=app