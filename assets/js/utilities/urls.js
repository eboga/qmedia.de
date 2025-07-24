/**
 * Validates URL
 * @param {string} url The URL to be validated.
 * @param {string} base The base URL, second parameter of URL constructor.
 * @returns {boolean} Whether URL is valid.
 */
function validateUrl(url, base = undefined) {
    try {
        new URL(url, base);
        return true;
    } catch {
        return false;
    }
}

/**
 * Sanitizes URL. Based on https://github.com/braintree/sanitize-url.
 * @param {any} url
 * @return {string}
 */
function sanitizeUrl(url) {
    const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
    const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
    const htmlCtrlEntityRegex = /&(newline|tab);/gi;
    const ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
    const urlSchemeRegex = /^.+(:|&colon;)/gim;
    const relativeFirstCharacters = ['.', '/'];

    function isRelativeUrlWithoutProtocol(url) {
        return relativeFirstCharacters.indexOf(url[0]) > -1;
    }

    function decodeHtmlCharacters(str) {
        return str.replace(htmlEntitiesRegex, (match, dec) => {
            return String.fromCharCode(dec);
        });
    }

    function sanitize(url) {
        const sanitizedUrl = decodeHtmlCharacters(url || '').replace(htmlCtrlEntityRegex, '').replace(ctrlCharactersRegex, '').trim();
        if (!sanitizedUrl) {
            return 'about:blank';
        }
        if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
            return sanitizedUrl;
        }
        const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
        if (!urlSchemeParseResults) {
            return sanitizedUrl;
        }
        const urlScheme = urlSchemeParseResults[0];
        if (invalidProtocolRegex.test(urlScheme)) {
            return 'about:blank';
        }
        return sanitizedUrl;
    }

    const result = sanitize(url);

    return result;
}

export { validateUrl, sanitizeUrl };
