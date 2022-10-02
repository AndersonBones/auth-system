import { Request, Response, NextFunction } from "express"
import JWT from 'jsonwebtoken'

export const Auth = async (req:Request, res:Response, next:NextFunction) => {

    if(req.cookies.token){
        req.headers.authorization = 'Bearer '+req.cookies.token;
        const [type, token] = req.headers.authorization.split(" ");

        if(token){
            try {
                const user = JWT.verify(token, process.env.SECRET_KEY as string)
                    
                if(user){
                    req.user = user
                    next();
                    return;
                }
                    
            } catch (error) {
                
            }
        }
        else{
            res.json({error:"Senha ou email inválidos"})
        }
    } else{
        res.json({error:"Não permitido"})

    }
}