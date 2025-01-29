const jwt = require("jsonwebtoken");
module.exports.authAdmin = (req,res,next) =>{
  try {
    const {admintoken} = req.headers; // Use lowercase header key
    // console.log(admintoken)
    if(!admintoken){
      return  res.json({success:false,message:"Not Authorized ,Login again!"})
    }
    const tokenDecode = jwt.verify(admintoken,process.env.JWT_SECRET )
    // console.log(tokenDecode)
    if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ){
      return res.json({success:false,message:"Not Authorized ,Login again!"})
    }
    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}