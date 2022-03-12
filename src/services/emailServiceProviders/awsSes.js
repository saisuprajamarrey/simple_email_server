const AWS = require("aws-sdk");

// configure aws sdk
const ses_config = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
};
const aws_ses = new AWS.SES(ses_config);

module.exports = aws_ses;