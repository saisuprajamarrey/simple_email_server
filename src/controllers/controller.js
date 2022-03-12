const emailFactoryService = require("./../services/emailFactoryService");
const config = require("config");
const BouncedEmail = require("./../models/bouncedEmail");

//Get the email service provider name.
const emailServiceProviderName = config.get("settings.emailServiceProvider");

/*
* This function handles the /send-email route.
* Extracts the parameters from req.body.
* Uses the factory service to get the email service provider.
* Calls the .send() method which returns either true or false.
* If the result is true then we will send success response to the client.
* Otherwise we will send the error message.
* */
const handleSendEmail = async (req, res) => {
    const {to, from, subject, bodyText, bodyHtml} = req.body;

    const emailProvider = emailFactoryService.getProvider(emailServiceProviderName, to, from, subject, bodyText, bodyHtml);
    if (!emailProvider) {
        res.status(500).send({error: "An error occurred."})
        return;
    }

    try {
        const result = await emailProvider.send();
        if (result) {
            res.status(200).send({message: "Successfully sent the email."})
        } else {
            res.status(400).send({error: "Unable to send the email."})
        }
    } catch (e) {
        console.log(e);
        res.send(500).send({error: "An error occurred"});
    }
}

/*
* This function handles /bounced-email route.
* Extracts the bounced email address from req.body.
* Stores the email id in the database.
* If the operation is successful then we will send success response to the client.
* Otherwise we will send error response.
* */
const handleBouncedEmail = async (req, res) => {
    try {
        const bouncedEmailID = req.body.email_address;
        const doc = BouncedEmail.create({email: bouncedEmailID});
        res.status(201).send({message: `Successfully stored the bounced email ${bouncedEmailID} in the db.`});
    } catch (e) {
        res.status(500).send({error: `error occurred when stored the bounced email: ${bouncedEmailID}.`});
    }
}

module.exports = {
    handleSendEmail,
    handleBouncedEmail,
}