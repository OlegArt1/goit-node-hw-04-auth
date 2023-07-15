const jwt = require("jsonwebtoken");

const User = require("../models/users");

async function current (req, res, next)
{
    const authHeader = req.headers.authorization;

    console.log(authHeader);
    
    try
    {
        const user = await User.findOne({ token: authHeader.token });

        console.log("Token: ", user);

        if (user === null)
        {
            console.log("Current user unauthorized error!");

            return res.status(401).json({ error: "Current user unauthorized error!" });
        }
        else if (user.token === null)
        {
            console.log("Current user unauthorized error!");

            return res.status(401).json({ error: "Current user unauthorized error!" });
        }
        else
        {
            console.log("Current user success response!");
            console.log(decode);
                
            res.status(200).json({ message: "Current user success response!"});
                
            next();
        }   
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);

        res.status(500).send({ message: "Internal server error!" });

        return next(error);
    }
}
module.exports = { current };