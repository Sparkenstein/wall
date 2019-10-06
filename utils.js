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


async function download_image(url) {
    const cache_dir = getCacheFolder();
    const res = await axios({
        method: "GET",
        url,
        responseType: 'stream'
    });
    const finalUrl = res.data.responseUrl.split("?")[0];
    let segments = finalUrl.split('/');
    let file_name = segments[segments.length-1] || "wallpaper";
    let file_path = path.join(cache_dir, file_name);
    
    let writer = fs.createWriteStream(file_path);
    res.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", () => {
            resolve(file_path);
        });
        writer.on('error', () => {
            reject("Error in downloading or saving image");
        });
    });
}

module.exports = { get_stdout, run, download_image };
