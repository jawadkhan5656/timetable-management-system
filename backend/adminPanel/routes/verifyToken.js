const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
        const token = req.header("token")
        if(!token)
            res.status(401).send("Token not found")
        else {
           
            const email = jwt.verify(token, process.env.SECRET)
            // res.send(email);
            if(email)
                next();
            else 
                return;
           
        }
    }

    module.exports = verifyToken;