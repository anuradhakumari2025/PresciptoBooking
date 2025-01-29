const jwt = require("jsonwebtoken");
module.exports.authDoctor = (req,res,next) =>{
  try {
    const {doctortoken} = req.headers; // Use lowercase header key
    // console.log(token)
    if(!doctortoken){
      return  res.json({success:false,message:"Not Authorized ,Login again!"})
    }
    const tokenDecode = jwt.verify(doctortoken,process.env.JWT_SECRET )
    // console.log(tokenDecode)
    req.body.doctorId = tokenDecode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}