const { getConfigHome } = require('platform-folders');
const path = require('path');
const fs = require('fs');
const readline = require('readline');


function get() {
    let path = path.join(getConfigHome(), "plasma-org.kde.plasma.desktop-appletsrc");
    let file;
    const readInterface = readline.createInterface({
        input: fs.createReadStream(path),
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

}


module.exports = { get, set}
