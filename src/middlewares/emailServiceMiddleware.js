const validator = require("validator");
const BouncedEmail = require("../models/bouncedEmail");
const { isEmailsBounced } = require("../utils/helper.util");

/*
* This is a middleware function for the route /send-email.
* This function checks whether to email id and from email id are valid.
* If so then it checks whether the emails are in the db.
* If so then we send a response to the client.
* Otherwise we go to next step.
* */
const isEmailsValid = async function (req, res, next) {
    const {to, from} = req.body;

    if (!validator.isEmail(to)) {
        res.status(400).send({error: `Invalid email address: ${to}`});
        return;
    }

    if (!validator.isEmail(from)) {
        res.status(400).send({error: `Invalid email address: ${from}`});
        return;
    }

    // I am checking both emails because a 'from email' can also be in a bounced emails db.
    const result = await isEmailsBounced(to, from);
    if (result) {
        res.status(400).send({error: "Email is a bounced email"})
        return;
    }

    next();
}

/*
* This is a middleware function for the route /bounced-email.
* This function checks if the bounced email id is already present in the database.
* If so then we send the response to the client.
* Otherwise we go the next step.
* */
const isEmailExistsInDB = async function (req, res, next) {
    const email_address = req.body.email_address;
    const result = await BouncedEmail.findByEmail(email_address);
    if (result) {
        res.status(400).send({message: "Email already exists"});
        return;
    }
    next();
}

module.exports = {
    isEmailsValid,
    isEmailExistsInDB,
}