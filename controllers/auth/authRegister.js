const bcrypt = require("bcrypt");
const User = require("../../models/users");

async function registered (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if (typeof subscription !== "string" && typeof subscription !== "undefined")
        {
            console.log("Registration validation error!");
        
            console.log("Subscription: ", typeof subscription);

            return res.status(400).send({
                status: "Bad request",
                code: 400,
                contentType: "application/json",
                responseBody: "Validation error.",
                message: "Registration validation error!"
            });
        }
        if (user !== null)
        {
            console.log("Registration conflict error!");

            return res.status(409).json({
                status: "Conflict",
                code: 409,
                contentType: "application/json",
                responseBody:
                {
                    message: "Email in use."
                },
                message: "Registration conflict error!"
            });
        }
        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({ email, password: passwordHash, subscription });
  
        console.log("Registration success response!");
  
        res.status(201).json({
            status: "Created",
            code: 201,
            contentType: "application/json",
            responseBody:
            {
                user:
                {
                    email: req.body.email,
                    subscription: req.body.subscription
                }
            },
            message: "Registration success response!"
        });
    }
    catch (error)
    {
        console.log("Registration validation error!");
        console.log(error);

        res.status(400).send({
            status: "Bad request",
            code: 400,
            contentType: "application/json",
            responseBody: "Validation error.",
            message: "Registration validation error!"
        });
        return next(error);
    }
};
module.exports = { registered };