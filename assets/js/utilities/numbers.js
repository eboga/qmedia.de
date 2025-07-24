function clampNumber(number, min = 0, max = 100) {
    return Math.min(Math.max(number, min), max);
}

// https://locutus.io/php/strings/number_format/
function formatNumber(number, decimals = 2, decPoint = ',', thousandsSep = '.') {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
    const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
    let s = '';
    const toFixedFix = function (n, prec) {
        if (('' + n).indexOf('e') === -1) {
            return +(Math.round(n + 'e+' + prec) + 'e-' + prec);
        } else {
            const arr = ('' + n).split('e');
            let sig = '';
            if (+arr[1] + prec > 0) {
                sig = '+';
            }
            return (+(
                Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) +
                'e-' +
                prec
            )).toFixed(prec);
        }
    };
    s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// https://locutus.io/php/is_numeric/
function isNumeric(...variables) {
    const whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200a', '\u200b', '\u2028', '\u2029', '\u3000'].join('');
    const result = variables.every(variable => (typeof variable === 'number' || (typeof variable === 'string' && whitespace.indexOf(variable.slice(-1)) === -1)) && variable !== '' && !isNaN(variable));
    return result;
}

function isNumber(...variables) {
    const result = variables.every(variable => isInteger(variable) || isFloat(variable));
    return result;
}

// https://locutus.io/php/var/is_int/
function isInteger(...variables) {
    const result = variables.every(variable => variable === +variable && Number.isFinite(variable) && !(variable % 1));
    return result;
}

// https://locutus.io/php/var/is_float/
function isFloat(...variables) {
    const result = variables.every(variable => +variable === variable && (!Number.isFinite(variable) || !!(variable % 1)));
    return result;
}

export {clampNumber, formatNumber, isNumeric, isNumber, isInteger, isFloat};
