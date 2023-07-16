const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = 'h5Gd3kf7Fg3H35gDm7Ngd2hd';

async function login (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (typeof subscription !== "string" && typeof subscription !== "undefined")
        {
            console.log("Login validation error!");
        
            console.log("User: ", user);

            return res.status(400).send({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody: "Validation error.",
                message: "Login validation error!"
            });
        }
        if (user === null)
        {
            console.log("Login auth error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    message: "Email or password is wrong."
                },
                message: "Login auth error!"
            });
        }
        if (isMatch === false)
        {
            console.log("Login auth error!");

            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                contentType: "application/json",
                responseBody:
                {
                    message: "Email or password is wrong."
                },
                message: "Login auth error!"
            });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        await User.updateOne({ _id: user._id }, { $set: { token } });

        console.log("Login success response!");

        console.log("User: " , user);

        return res.status(200).json({
            status: "OK",
            code: 200,
            contentType: "application/json",
            responseBody:
            {
                token: token,
                user:
                {
                    email: req.body.email,
                    subscription: req.body.subscription
                }
            },
            message: "Login success response!"
        });
    }
    catch (error)
    {
        console.log("Login validation error!");
        console.log(error);
        
        res.status(400).send({
            status: "Bad request",
            code: 400,
            contentType: "application/json",
            responseBody: "Validation error.",
            message: "Login validation error!"
        });
        return next(error);
    }
};
module.exports = { login };