const app = require("./app");
const config = require("config");

const port = config.get("settings.port") || 3000;

// Create HTTP server
app.listen(port, () => {
    console.log("server is running on port: " + port);
});



