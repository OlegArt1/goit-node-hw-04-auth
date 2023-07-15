const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = 'ffgdfgh56vgghh';

async function login (req, res, next)
{
    const { email, password, subscription } = req.body;

    try
    {
        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (typeof subscription !== "string")
        {
            console.log("Login validation error!");
        
            return res.status(400).send({ message: "Login validation error!" });
        }
        if (user === null)
        {
            console.log("Login auth error!");

            return res.status(401).json({ message: "Login auth error!" });
        }
        if (isMatch === false)
        {
            console.log("Login auth error!");

            return res.status(401).json({ message: "Login auth error!" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        await User.updateOne({ _id: user._id }, { $set: { token } });

        console.log("Login success response!");

        return res.status(200).json({ message: "Login success response!", token });
    }
    catch (error)
    {
        console.log("Login validation error!");
        console.log(error);
        
        res.status(400).send({ message: "Login validation error!" });

        return next(error);
    }
};
module.exports = { login };