const Contacts = require("../../models/contacts");

async function updateStatusContact (req, res)
{
    try
    {
        const { id } = req.params;

        const newContact =
        {
            favorite: req.body.favorite,
        };
        const updatedContact = await Contacts.findByIdAndUpdate(id, newContact, { new: true });

        if (!updatedContact)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Contact updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Contact updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing field favorite!");
        console.log(error);        
    
        return res.status(400).send({ message: "Missing field favorite!" });
    }
};
module.exports = { updateStatusContact };