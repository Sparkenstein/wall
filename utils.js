const { spawnSync } = require('child_process');

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

module.exports = { get_stdout, run };
