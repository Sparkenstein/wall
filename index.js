const os = require("os");
const supportedPlatforms = ["linux", "darwin"];
const currentPlatform = os.platform();

if (supportedPlatforms.includes(currentPlatform)){
    if (currentPlatform === "linux"){
        module.exports = require("./Linux");
    } else if (currentPlatform === "darwin"){
        module.exports = require("./Mac");
    }
} else {
    throw new Error("Unsupported platform, you are welcome to contribute :)");
}