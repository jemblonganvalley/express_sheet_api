require("dotenv").config();
const jwt = require('jsonwebtoken')

const auth_middleware = (req, res, next) => {
  const headersToken = req.headers.authorization
  const token = headersToken && headersToken.split(' ')[1]
  if(token === null){
    return res.sendStatus(404)
  }else{
    jwt.verify(token, process.env.TOKEN, (err, user)=>{
      if(err){
        res.status(401).json({
          msg : err
        })
      }
      next()
    })
  }
  
};

module.exports = auth_middleware;
