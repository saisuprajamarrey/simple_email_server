const EmailService = require("./emailService");
const aws_ses = require("../emailServiceProviders/awsSes");

/*
* This class extends 'EmailService' class and overrides the methods to provide it own implementations.
* */
class AwsEmailService extends EmailService {
    constructor(to, from, subject, bodyText, bodyHtml) {
        super(to, from, subject, bodyText, bodyHtml);
    }

    // Calls the email service provider to send the email.
    async send() {
        // Construct email based on the provider specific configuration.
       const msg = this.constructEmail();

       try {
           //Call the provider specific method to send the email.
           await aws_ses.sendEmail(msg).promise();
           return true;
       } catch (e) {
           console.log("error: ", e);
           return false;
       }
    }

    // constructs the message object according to the provider specific configuration
    constructEmail() {
        let msg = {
            Source: this.from,
            Destination: {
                ToAddresses: [
                    this.to
                ],
            },
            ReplyToAddresses: [],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: this.bodyHtml,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: this.bodyText,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: this.subject
                }
            },
        };

        return msg;
    }
}

module.exports = AwsEmailService;
