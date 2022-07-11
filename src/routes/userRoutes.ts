import {NextFunction, Request, Response, Router} from 'express';

import pool  from '../database';

const jwt = require('jsonwebtoken');

class LoginRoutes {
    public router: Router = Router();
}

function verifyToken(req:Request,res:Response,next:NextFunction){
    if(!req.headers.authorization) return res.status(400).json('no autorizado');
    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        console.log(content)
    }
}