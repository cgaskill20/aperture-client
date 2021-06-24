export function sab2str(buf, len) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function str2sab(str, sab) {
    let bufView = new Uint16Array(sab);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
}