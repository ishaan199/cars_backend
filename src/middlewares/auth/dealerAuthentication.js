import jwt from 'jsonwebtoken';

export function dealerAuthentication(req,res,next){
    try{
        let token = req.headers['dealer-key']

        if(!token){
            return res.status(400).send({status:false,msg:"Token must be present"});
        };

        const decryptToken = jwt.verify(token, "dealership");
        
        if(!decryptToken){
            return res.status(400).send({status:false,msg:"Enter the valid token"})
        };
        next();
    }catch(error){
        return res.status(500).send({status:false,msg:"Auth Server",error:error.message});
    };
};