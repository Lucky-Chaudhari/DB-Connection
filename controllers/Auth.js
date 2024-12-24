const bcrypt= require("bcrypt")
const User= require("../models/User")





//signup route handler
exports.signup = async(req,res)=>{

  try {
    //get data
    const{name,email,password,role}=req.body;
    //check if user already exist
    const existingUser=await User.findOne({email});

    if(existingUser){
      return res.status(400).json({
        success:false,
        message:"User Already Exists",
      })
    }
//secure Password

let hashedPassword;
try{
  hashedPassword=await bcrypt.hash(password,10);
}
catch(err){
  return res.status(500).json({
    success:false,
    message:"Error in hashing Password",
  })

}
//create entry for user in database
const user = await User.create({
  name,email,password:hashedPassword,role
})
returnres.status(200).json({
  success:false,
  message:"User Create Successfully",
});

  } catch(error) {
console.error(error);
return res.status(500).json({
  success:false,
  message:'User cannot be registered, Please try again later',
});
  }
}