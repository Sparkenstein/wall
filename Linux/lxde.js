const { getConfigHome } = require("platform-folders");
const path = require("path");
const ini = require("ini");

function get() {
    const session = process.env.DESKTOP_SESSION || "LXDE";
    let p = path.join(getConfigHome(), `pcmanfm/${session}/desktop-items-0.conf`)
    let config = ini.parse(p);
    return config["*"].wallpaper || "No wallpaper found for LXDE";
}

module.exports = { get }
