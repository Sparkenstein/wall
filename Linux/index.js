const q = require('quote-unquote');
const { spawnSync } = require('child_process');
const kde = require("./kde");
const lxde = require("./lxde");

function get_wallpaper() {
    const desktop = process.env.XDG_CURRENT_DESKTOP;

    if (is_gnome_compliant(desktop)) {
        return parse_dconf(
            "gsettings",
            ["get", "org.gnome.desktop.background", "picture-uri"],
        );
    }

    const matcher = {
        "KDE": kde.get(),
        "X-Cinnamon" : parse_dconf(
            "dconf",
            ["read", "/org/cinnamon/desktop/background/picture-uri"],
        ),
        "MATE": parse_dconf(
            "dconf",
            ["read", "/org/mate/desktop/background/picture-filename"],
        ),
        "XFCE": get_stdout(
            "xfconf-query",
            [
                "-c",
                "xfce4-desktop",
                "-p",
                "/backdrop/screen0/monitor0/workspace0/last-image",
            ],
        ),
        "LXDE": lxde.get(),
        "Deepin": parse_dconf(
            "dconf",
            [
                "read",
                "/com/deepin/wrap/gnome/desktop/background/picture-uri",
            ],
        ),
    }
    return matcher[desktop];
}

function is_gnome_compliant(desktop) {
    return desktop.includes("GNOME") || desktop == "Unity" || desktop == "Pantheon"
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

console.log(get_wallpaper())