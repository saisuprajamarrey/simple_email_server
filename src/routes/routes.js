const express = require("express");
const router = express.Router();
const {isEmailsValid, isEmailExistsInDB} = require("./../middlewares/emailServiceMiddleware");
const controller = require("./../controllers/controller");

router.post("/send-email", isEmailsValid, controller.handleSendEmail);
router.post("/bounced-email", isEmailExistsInDB, controller.handleBouncedEmail);

router.get("*", (req, res) => {
    res.send({error: "Invalid route"});
})

module.exports = router;