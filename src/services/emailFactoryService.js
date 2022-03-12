const AwsEmailService = require("./emailServices/awsEmailService");
const SendGridEmailService = require("./emailServices/sendGridEmailService");
const emailProviderNames = require("./../services/emailServiceProviders/emailServiceProviderNames");

/*
* This is a factory function which accepts the email service provider name and email parameters.
* Based on the email service provider passed returns either AwsServiceProvider class object or SendGridEmailService class obj.
* If nothing matches then returns null
* */
const getProvider = function (serviceName, to, from, subject, bodyText, bodyHtml) {
    serviceName = serviceName.toUpperCase();

    switch (serviceName) {
        case emailProviderNames.AWS:
            return new AwsEmailService(to, from, subject, bodyText, bodyHtml);
        case emailProviderNames.SENDGRID:
            return new SendGridEmailService(to, from, subject, bodyText, bodyHtml);
        default:
            return null;
    }
}

module.exports = {
    getProvider,
}