/**
 * Gets a type of provided variable
 * @see https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
 * @param operand
 * @returns string
 */
function getType(operand) {
    const result = ({}).toString.call(operand).match(/([a-z]+)(:?\])/i)[1];
    return result;
}

function isBoolean(...booleans) {
    const result = booleans.every(boolean => (boolean === true || boolean === false));
    return result;
}

function isStyles(...styles) {
    const result = styles.every(style => style?.constructor?.name === 'CSSStyleDeclaration');
    return result;
}

function isMedia(...medias) {
    const result = medias.every(media => media?.constructor?.name === 'MediaQueryList');
    return result;
}

function queueMacrotask(callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function');
    }

    window.setTimeout(callback, 0);
}

export {getType, isStyles, isMedia, isBoolean, queueMacrotask};
