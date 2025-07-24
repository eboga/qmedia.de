function listenDocumentInteractive(callback) {
    function handler() {
        if (document.readyState === "interactive" || document.readyState === "complete") {
            callback();
            document.removeEventListener("readystatechange", handler);
        }
    }

    if (document.readyState === "interactive" || document.readyState === "complete") {
        callback();
    } else {
        document.addEventListener("readystatechange", handler);
    }
}

function listenDocumentLoaded(callback) {
    function handler() {
        callback();
        document.removeEventListener("DOMContentLoaded", handler);
    }

    if (document.readyState === "interactive" || document.readyState === "complete") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", handler);
    }
}

function listenDocumentComplete(callback) {
    function handler() {
        if (document.readyState === "complete") {
            callback();
            document.removeEventListener("readystatechange", handler);
        }
    }

    if (document.readyState === "complete") {
        callback();
    } else {
        document.addEventListener("readystatechange", handler);
    }
}



/**
 * Detects if passed parameter is of `Element` interface.
 * @param elements
 * @returns {boolean}
 */
function isElement(...elements) {
    const result = elements.every(element => !!(element?.nodeType && element.nodeType === Node.ELEMENT_NODE));
    return result;
}

function validateSelector(...selectors) {
    const fragment = document.createDocumentFragment();

    const result = selectors.every(selector => {
        try {
            fragment.querySelector(selector);
            return true;
        } catch (error) {
            return false;
        }
    });

    return result;
}

function detectScrollbarWidth() {
    const result = window.innerWidth - document.documentElement.clientWidth;
    return result;
}

function callbackLoadingComplete(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

function callbackLoadingInteractive(callbackFunction) {
    if (document.readyState === 'complete' || document.readyState === 'interactive'){
        callbackFunction();
    } else {
        document.addEventListener('DOMContentLoaded', callbackFunction);
    }
}



export {detectScrollbarWidth, isElement, callbackLoadingComplete, callbackLoadingInteractive, validateSelector, listenDocumentInteractive, listenDocumentLoaded, listenDocumentComplete};
