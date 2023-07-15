const jwt = require("jsonwebtoken");

const User = require("../models/users");

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'ffgdfgh56vgghh';

function auth (req, res, next)
{
    const authHeader = req.headers.authorization;

    const [bearer, token] = authHeader.split(" ", 2);

    if (typeof authHeader !== "string")
    {
        console.log("No token provided!");

        return res.status(401).json({ error: "No token provided!" });
    }
    if (bearer !== "Bearer")
    {
        console.log("No token provided!");

        return res.status(401).json({ error: "No token provided!" });
    }
    jwt.verify(token, JWT_SECRET, async (err, decode) =>
    {
        if (err)
        {
            if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
            {
                console.log("Token error!");
                
                return res.status(401).json({ error: "Token error!" });
            }
            return next(err);
        }
        try
        {
            const user = await User.findOne({ token: token });

            if (user === null)
            {
                console.log("Middleware unauthorized error!");

                return res.status(401).json({ error: "Middleware unauthorized error!" });
            }
            else if (user.token === null)
            {
                return res.status(401).json({ error: "Middleware unauthorized error!" });
            }
            else
            {
                req.user = { id: user._id, name: user.name };

                console.log(req.user);
                console.log(decode);
                
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
    });
}
module.exports = auth;