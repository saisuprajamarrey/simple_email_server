const mongoose = require('mongoose')
const config = require("config");

const dbName = config.get("settings.dbName") || "bouncedEmails";

// Connect to database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    dbName,
}, function (error) {
    if (error) {
        throw error;
    }
});