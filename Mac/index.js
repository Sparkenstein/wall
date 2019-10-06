const q = require("quote-unquote");
const { get_stdout, run, download_image } = require("../utils");

function get() {
    return get_stdout(
        "osascript",
        [
            "-e",
            `tell application "Finder" to get POSIX path of (get desktop picture as alias)`,
        ],
    )
}

// Sets the wallpaper from a file.
function set_from_path(path) {
    run(
        "osascript",
        [
            "-e",
            `tell application "Finder" to set desktop picture to POSIX file ${q.double(path)}`,
        ],
    )
}

// Sets the wallpaper from a URL.
async function set_from_url(url) {
    const path = await download_image(url);
    set_from_path(path)
}

module.exports = { get, set_from_path, set_from_url }
