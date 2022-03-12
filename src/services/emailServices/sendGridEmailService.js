const EmailService = require("./emailService");
const sgMail = require("../emailServiceProviders/sendGrid");

/*
* This class extends 'EmailService' class and overrides the methods to provide it own implementations.
* */
class SendGridEmailService extends EmailService {
    constructor(to, from, subject, bodyText, bodyHtml) {
        super(to, from, subject, bodyText, bodyHtml);
    }

    // Calls the email service provider to send the email.
    async send() {
        // Construct email based on the provider specific configuration.
        const msg = this.constructEmail();

        try {
            //Call the provider specific method to send the email.
           await sgMail.send(msg);
           return true;
        } catch (e) {
            console.log("error: ", e);
            return false;
        }
    }

    // constructs the message object according to the provider specific configuration
    constructEmail() {
        return {
            to: this.to,
            from: this.from,
            subject: this.subject,
            text: this.bodyText,
            html: this.bodyHtml
        };
    }
}

module.exports = SendGridEmailService;