const Contacts = require("../../models/contacts");

async function deleteContact (req, res)
{
    const { id } = req.params;

    try
    {
        const contactId = await Contacts.findByIdAndRemove(id);

        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Contact deleted!");

            return res.status(200).send({ message: "Contact deleted!" });
        }
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        return res.status(500).send({ message: "Internal server error!" });
    }
};
module.exports = { deleteContact };