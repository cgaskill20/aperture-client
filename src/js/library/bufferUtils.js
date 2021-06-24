export function sab2str(buf, len, start = 0) {
    return String.fromCharCode.apply(null, new Uint16Array(buf.slice(start, len*2)));
}

export function str2sab(str, sab, start = 0) {
    let bufView = new Uint16Array(sab);
    for (let i = start; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
}