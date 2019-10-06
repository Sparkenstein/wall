const { spawnSync } = require('child_process');
const { getCacheFolder } = require("platform-folders");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

function get_stdout(command, args) {
    let output = spawnSync(command, args);
    if(output.status === 0) {
        return output.stdout.toString('utf-8')
    } else {
        throw new Error("failed to run command")
    }
}

function run(command, args) {
    get_stdout(command, args);
}


function download_image(url) {
    let cache_dir = getCacheFolder();
    let segments = url.split('/');
    let file_name = segments[segments.length-1];
    if (!file_name) {
        file_name = "wallpaper";
    }
    let file_path = path.join(cache_dir, file_name);
    axios.get(url).then((f) => {
        fs.writeFileSync(file_path, f);
        console.log("written")        
    })

}

module.exports = { get_stdout, run, download_image };
