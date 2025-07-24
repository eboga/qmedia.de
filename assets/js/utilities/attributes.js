/**
 * Replaces href attribute of use tag element.
 * @param {Element} element An element to replace href attribute for. Suppose to have `data-replace-fragment` attribute.
 */
function replaceFragment(element) {
    if (
        'tagName' in element &&
        element.tagName.toUpperCase() === 'USE' &&
        element.hasAttribute('href') &&
        element.hasAttribute('data-replace-fragment')
    ) {
        const href = element.getAttribute('href');
        const attribute = element.getAttribute('data-replace-fragment');

        element.setAttribute('href', attribute);
        element.setAttribute('data-replace-fragment', href);
    }
}

/**
 * Replaces textual content of element.
 * @param {Element} element An element to replace text content for. Suppose to have `data-replace-text` attribute.
 */
function replaceText(element) {
    if (element.hasAttribute('data-replace-text')) {
        const content = element.textContent;
        const attribute = element.getAttribute('data-replace-text');

        if (content && attribute) {
            element.textContent = attribute;
            element.setAttribute('data-replace-text', content);
        }
    }
}

/**
 * Toggles HTML classes on target elements found by selectors.
 * @param {Element} element The element containing data attributes with config about what classes to toggle on what elements.
 *                          Suppose to have two data attributes. First, `data-toggle-target-selector` is to define selectors
 *                          of target elements. The value is passed directly to `Document.querySelectorAll()` method,
 *                          so it may contain any multiple selectors, classes and/or identifiers.
 *                          Second, `data-toggle-target-class` is to define what classes to toggle on target element.
 *                          Might contain multiple classes separated by whitespaces. Optional. Default: 'isHidden'.
 */
function toggleClass(element) {
    if (element.hasAttribute('data-toggle-target-selector')) {
        const attributeClass = element.getAttribute('data-toggle-target-class');
        const attributeSelector = element.getAttribute('data-toggle-target-selector');

        const toggleClasses = attributeClass ? attributeClass.split(' ') : null;

        try {
            const targetElements = document.querySelectorAll(attributeSelector);
            if (targetElements) {
                for (const targetElement of targetElements) {
                    if (toggleClasses) {
                        for (const toggleClass of toggleClasses) {
                            try {
                                targetElement.classList.toggle(toggleClass);
                            } catch {}
                        }
                    } else {
                        targetElement.classList.toggle('isHidden');
                    }
                }
            }
        } catch {}
    }
}

export { replaceFragment, replaceText, toggleClass };
