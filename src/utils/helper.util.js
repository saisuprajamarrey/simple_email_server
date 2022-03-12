const BouncedEmail = require("./../models/bouncedEmail");
const emailProviderNames = require("./../services/emailServiceProviders/emailServiceProviderNames");

/*
* This is a helper function to check if the to email and from email are already
* present in the database or not.
* If either of them are present in the db, then returns true, Otherwise false.
* */
const isEmailsBounced = async (emailId1, emailId2) => {
    return await BouncedEmail.findEmails(emailId1, emailId2);
}

/*
* This function checks whether the email service provider name is valid or not.
* */
const isValidServiceProvider = (emailProviderName) => {
    emailProviderName = emailProviderName.toUpperCase();
    return Object.values(emailProviderNames).find(name => name === emailProviderName);
}

module.exports = {
    isEmailsBounced,
    isValidServiceProvider,
}