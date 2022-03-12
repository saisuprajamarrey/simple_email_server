const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "./config/.env"), debug: true});
const express = require("express");
const bodyParser = require('body-parser');
require("./src/db/mongoose");
const config = require("config");
const {isValidServiceProvider} = require("./src/utils/helper.util");
const routes = require("./src/routes/routes");


// Retrieve the email service provider name and check if it is a valid provider name or not.
const emailProviderName = config.get("settings.emailServiceProvider");
if (!emailProviderName || !isValidServiceProvider(emailProviderName)) {
    throw Error("Invalid email service provider name or no email service provider name is given.")
}

const app = express();

// Parse incoming body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Load router
app.use("/", routes);



module.exports = app;




