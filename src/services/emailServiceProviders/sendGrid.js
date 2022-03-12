const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SEND_GRID_API_KEY;

//configure sendgrid
sgMail.setApiKey(apiKey);

module.exports = sgMail;


