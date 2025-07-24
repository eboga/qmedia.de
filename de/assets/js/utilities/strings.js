import {isInteger} from './numbers.js';

/**
 * Parses JSON string. Don't throw exception if string is not valid, instead returns `null`.
 * @param {string} string The string, presuming to be JSON string.
 * @returns {null|any} The parsed JSON, if it was valid.
 */
function parseJson(string) {
    try {
        const json = JSON.parse(string);
        return json;
    } catch (error) {
        return null;
    }
}

/**
 * JavaScript equivalent to PHP's `trim()` function.
 * @see https://locutus.io/php/strings/trim/
 * @param str
 * @param charlist
 * @returns {*|string}
 */
function trimBoth(str, charlist = '') {
    let whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000',
    ].join('');
    let l = 0;
    let i = 0;
    str += '';
    if (charlist) {
        whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

/**
 * JavaScript equivalent to PHP's `ltrim()` function.
 * @see https://locutus.io/php/strings/ltrim/
 * @param str
 * @param charlist
 * @returns {string}
 */
function trimStart(str, charlist = '') {
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
    const re = new RegExp('^[' + charlist + ']+', 'g');
    return (str + '').replace(re, '');
}

/**
 * JavaScript equivalent to PHP's `rtrim()` function.
 * @see https://locutus.io/php/strings/rtrim/
 * @param str
 * @param charlist
 * @returns {string}
 */
function trimEnd(str, charlist = '') {
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1');
    const re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '').replace(re, '');
}

function isString(...strings) {
    const result = strings.every(string => typeof string === 'string' || string instanceof String);
    return result;
}

function isEmptyString(...strings) {
    const result = strings.every(string => isString(string) && string === '');
    return result;
}

function generateId(length = 10) {
    if (!isInteger(length) || length < 1 || length > 20) {
        throw new Error('Invalid length.');
    }

    const start = Math.random() < 0.5 ? 65 : 97;

    let result = String.fromCharCode(start + Math.floor(Math.random() * 26));

    for (let i = 1; i < length; i++) {
        const random = Math.floor(Math.random() * 36).toString(36);
        result += random;
    }

    return result;
}

function getCustomProperties(element) {
    const result = new Map();

    if ('computedStyleMap' in element) {
        const styles = element.computedStyleMap();
        for (const [property, value] of styles) {
            if (property.startsWith("--")) {
                result.set(property, value.toString());
            }
        }
    } else {
        const styles = window.getComputedStyle(element);
        for (let index = 0; index < styles.length; index++) {
            const property = styles[index];
            if (property.startsWith("--")) {
                result.set(property, styles.getPropertyValue(property));
            }
        }
    }

    return result;
}

export {parseJson, trimBoth, trimStart, trimEnd, isString, isEmptyString, generateId, getCustomProperties};
