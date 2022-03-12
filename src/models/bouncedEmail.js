const mongoose = require("mongoose");
const validator = require("validator");

// schema for bounced emails
const bouncedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

}, {
    timestamps: true
});

/*
* Finds the document by email id.
* If document exists with given email id then return true, Otherwise false.
* */
bouncedEmailSchema.statics.findByEmail = async (emailId) => {
    try {
        const doc = await BouncedEmail.findOne({email: emailId});
        if (!doc) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

/*
* Finds the from and to emails in the database, If either of them is present then returns true.
* Otherwise returns false.
* */
bouncedEmailSchema.statics.findEmails = async (emailId1, emailId2) => {
    try {
        const docs = await BouncedEmail.find({$or: [{email: emailId1}, {email: emailId2}]});
        if (!docs || docs.length === 0) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

const BouncedEmail = mongoose.model('BouncedEmail', bouncedEmailSchema);
module.exports = BouncedEmail;