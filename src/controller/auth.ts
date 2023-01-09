let jwt = require('jsonwebtoken')
import { Request, Response } from 'express';
let dotenv = require('dotenv')
dotenv.config()
exports.createToken =  ( id : number) =>{
    const token =   jwt.sign({id} , process.env.jwtkey, { expiresIn: 86400})
    return token
}
exports.requireAuth = (req :Request, res: Response, next) => {
    
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, process.env.jwtkey, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
       res.send('Cannot find token')
    }
}