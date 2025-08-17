import { isElement } from '../utilities/document.js';
import {debounce as debounceDecorator} from '../utilities/debounce.js';
import {queueMacrotask} from '../utilities/misc.js';

const rootSelector = '.jsLanguageSwitcher';
const currentSelector = '.jsLanguageSwitcherCurrent';
const itemsSelector = '.jsLanguageSwitcherItems';
const itemSelector = '.jsLanguageSwitcherItem';

const openClass = 'isOpen';

initiateLanguageSwitcher();

function initiateLanguageSwitcher() {
    const rootElement = document.querySelector(rootSelector);

    if (!isElement(rootElement)) {
        return;
    }

    const currentElement = rootElement.querySelector(currentSelector);
    const itemsElement = rootElement.querySelector(itemsSelector);
    const itemElements = Array.from(rootElement.querySelectorAll(itemSelector));

    if (!isElement(currentElement, itemsElement) || itemElements.length === 0) {
        return;
    }

    const touchQuery = '(pointer: coarse)';
    const touchMedia = window.matchMedia(touchQuery);

    const debounceTimeout = 150;
    const debouncedWrapper = debounceDecorator(debounceCallback, debounceTimeout);

    initiateHandlers();

    touchMedia.addEventListener('change', listenMediaChange, false);



    function initiateHandlers() {
        if (isItemsVisible()) {
            makeItemsInvisible();
        }

        if (touchMedia.matches === true) {
            currentElement.addEventListener('click', listenCurrentClick, false);
        } else {
            rootElement.addEventListener('mouseover', listenRootMouseover, false);
            rootElement.addEventListener('mouseout', listenRootMouseout, false);
        }
    }

    function dismantleHandlers() {
        if (isItemsVisible()) {
            makeItemsInvisible();
        }

        currentElement.removeEventListener('click', listenCurrentClick, false);
        rootElement.removeEventListener('mouseover', listenRootMouseover, false);
        rootElement.removeEventListener('mouseout', listenRootMouseout, false);
        window.removeEventListener('click', listenOutsideClick, false);
    }



    function isItemsVisible() {
        const result = rootElement.classList.contains(openClass);
        return result
    }

    function makeItemsVisible() {
        rootElement.classList.add(openClass);
    }

    function makeItemsInvisible() {
        rootElement.classList.remove(openClass);
    }



    function debounceCallback() {
        if (isItemsVisible()) {
            makeItemsInvisible();
        }
    }



    function listenCurrentClick() {
        if (isItemsVisible() === true) {
            makeItemsInvisible();

            window.removeEventListener('click', listenOutsideClick, false);
        } else {
            makeItemsVisible();

            queueMacrotask(() => {
                window.addEventListener('click', listenOutsideClick, false);
            });
        }
    }

    function listenOutsideClick(event) {
        const targetElement = event.target;

        if (targetElement instanceof Element) {
            if (rootElement.contains(targetElement) === true) {
                // NOTE: Do nothing.
            } else {
                makeItemsInvisible();
            }
        }

        window.removeEventListener('click', listenOutsideClick, false);
    }

    function listenRootMouseover(event) {
        debouncedWrapper.cancel();

        if (touchMedia.matches === false && isItemsVisible() === false) {
            makeItemsVisible();
        }
    }

    function listenRootMouseout(event) {
        debouncedWrapper();
    }

    function listenMediaChange(event) {
        dismantleHandlers();
        initiateHandlers();
    }
}
