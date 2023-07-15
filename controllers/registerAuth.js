const bcrypt = require("bcrypt");
const User = require("../models/users");

async function registered (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if (typeof subscription !== "string")
        {
            console.log("Registration validation error!");
        
            return res.status(400).send({ message: "Registration validation error!" });
        }
        if (user !== null)
        {
            console.log("Registration conflict error!");

            return res.status(409).json({ message: "Registration conflict error!" });
        }
        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({ email, password: passwordHash });
  
        console.log("Registration success response!");
  
        res.status(201).json({ message: "Registration success response!" });
    }
    catch (error)
    {
        console.log("Registration validation error!");
        console.log(error);

        res.status(400).send({ message: "Registration validation error!" });

        return next(error);
    }
};
module.exports = { registered };