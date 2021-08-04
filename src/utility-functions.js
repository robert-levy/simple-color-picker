import colorMappings from './color-mappings.json'

export const checkColorType = (color) => {
    const rgbRegex = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/
    const hslRegex = /^hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)$/
    const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6})$/
    const isNum = /^\d+$/
    const lettersOnly = /^[a-z0-9_-]+$/

    if (isNum.test(color)) return "formatError"
    if (color.match(rgbRegex) !== null) return "rgb"
    if (color.match(hslRegex) !== null) return "hsl"
    if (color.match(hexRegex) !== null && color.startsWith('#')) return "hex"
    if (Object.keys(colorMappings).includes(color) && color.match(lettersOnly)) return "name"
    return "formatError"
}

export const rgbToHex = (rgb) => {
    const rgbArr = rgb.substring(4, rgb.length - 1).replace(/ /g, '').split(',')
    let fullHex = ''
    rgbArr.forEach(element => {
        var hex = Number(element).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        fullHex += hex
    });
    return `#${fullHex}`
}

export const rgbToHsl = (rgb) => {
    const rgbArr = rgb.substring(4, rgb.length - 1).replace(/ /g, '').split(',')
    var red = rgbArr[0]
    var green = rgbArr[1]
    var blue = rgbArr[2]

    red = red < 0 ? 0 : red > 255 ? 255 : red;
    green = green < 0 ? 0 : green > 255 ? 255 : green;
    blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

    var r = red / 255,
        g = green / 255,
        b = blue / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, l;
    if (max === min) {
        h = 0;
    } else if (r === max) {
        h = (g - b) / delta;
    } else if (g === max) {
        h = 2 + (b - r) / delta;
    } else if (b === max) {
        h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) h += 360;
    l = (min + max) / 2;
    if (max === min) s = 0;
    else if (l <= 0.5) s = delta / (max + min);
    else s = delta / (2 - max - min);
    return `hsl(${Math.round(h)},${Math.round(s * 100)}%,${Math.round(l * 100)}%)`

}

export const hexToRgb = (hex) => {
    const array = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
    return `rgb(${array[0]},${array[1]},${array[2]})`
}

export const hexToHsl = (hex) => {
    var r, g, b
    if (hex.length === 4) {
        var result = [...hex]
        r = "0x" + result[1] + result[1];
        g = "0x" + result[2] + result[2];
        b = "0x" + result[3] + result[3];

    }
    else if (hex.length === 7) {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        r = parseInt(result[1], 16)
        g = parseInt(result[2], 16)
        b = parseInt(result[3], 16)
    }

    r /= 255
    g /= 255
    b /= 255
    var max = Math.max(r, g, b), min = Math.min(r, g, b)
    var h, s, l = (max + min) / 2

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return `hsl(${h},${s}%,${l}%)`;
}

export function hslToHex(hsl) {
    const hslArr = hsl.substring(4, hsl.length - 1).replace(/ /g, '').replace(/%/g, '').split(',')
    let h = hslArr[0]
    let s = hslArr[1]
    let l = hslArr[2]

    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export function hslToRgb(hsl) {
    const hslArr = hsl.substring(4, hsl.length - 1).replace(/ /g, '').replace(/%/g, '').split(',')
    var h = hslArr[0];
    var s = hslArr[1];
    var l = hslArr[2];

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgb(${r},${g},${b})`;
}
