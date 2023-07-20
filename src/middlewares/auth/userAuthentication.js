import jwt from 'jsonwebtoken';

export function userAuthentication(req,res,next){
    try{
        let token = req.headers['x-api-key'];
        
        if(!token){
            return res.status(400).send({status:false,msg:"Token must be present."})
        };

        let decryptToken = jwt.verify(token , "cars");
        if(!decryptToken){
            return res.status(400).send({status:false,msg:"Token must be present and correct"});
        }else{
            next();
        }
    }catch(error){
        return res.status(500).send({status:false,msg:"Auth Error",error:error.message});
    };
};