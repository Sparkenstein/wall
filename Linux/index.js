const q = require('quote-unquote');
const { spawnSync } = require('child_process');

function get_wallpaper() {
    const desktop = process.env.XDG_CURRENT_DESKTOP;

    if (is_gnome_compliant(desktop)) {
        return parse_dconf(
            "gsettings",
            ["get", "org.gnome.desktop.background", "picture-uri"],
        );
    }
}

function is_gnome_compliant(desktop) {
    return desktop.contains("GNOME") || desktop == "Unity" || desktop == "Pantheon"
}


function parse_dconf(command, args) {
    const stdout = q.unquote(get_stdout(command, args));
    if (stdout.starts_with("file://")) {
        stdout = stdout.substring(7);
    }
    return stdout;
}


function get_stdout(command, args) {
    let output = spawnSync(command, args);
    if(output.status === 0) {
        return output.toString('utf-8')
    } else {
        throw new Error("failed to run command")
    }
}