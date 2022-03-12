/*
* This class is an abstract email service class contains methods send() and constructEmail().
* Other classes must extend this class and should override the methods and provide their own implementations.
* send() was used to send the email.
* constructEmail() method is used to construct the message object based on the email service provider format.
* Method block were empty to mimic the abstract class behaviour.
* */
class EmailService {
    constructor(to, from, subject, bodyText, bodyHtml) {
        if (this.constructor === EmailService) {
            throw new Error("Can't instantiate abstract class!");
        }

        this.to = to;
        this.from = from;
        this.subject = subject;
        this.bodyText = bodyText;
        this.bodyHtml = bodyHtml;
    }

    // This method contains the implementation logic for sending the email.
    send() {
        throw new Error("Abstract method!");
    }

    // This method is use to construct message based on the provider specification.
    constructEmail() {
        throw new Error("Abstract method!");
    }
}

module.exports = EmailService;