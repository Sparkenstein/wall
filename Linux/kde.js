const { getConfigHome } = require('platform-folders');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const q = require('quote-unquote');


function get() {
    let p = path.join(getConfigHome(), "plasma-org.kde.plasma.desktop-appletsrc");
    let file;
    const readInterface = readline.createInterface({
        input: fs.createReadStream(p),
        console: false
    });

    readInterface.on('line', function(line) {
        if(line.startsWith("Image=")) {
            let uri = line.substring(6).trim();
            if(uri.startsWith("file://")){
                file = uri.substring(7);
            }
        }
    });
    return file;
}

function set(path) {
    run(
        "qdbus",
        [
            "org.kde.plasmashell",
            "/PlasmaShell",
            "org.kde.PlasmaShell.evaluateScript",
            format(
                `
const monitors = desktops()
for (var i = 0; i < monitors.length; i++) {{
    monitors[i].currentConfigGroup = ["Wallpaper"]
    monitors[i].writeConfig("Image", {})
}}
${q.quote(`file://${path}`)}
`,
            ),
        ],
    )
}

function run(command, args) {
    get_stdout(command, args);
}


module.exports = { get, set}
