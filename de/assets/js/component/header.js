import {isElement} from '../utilities/document.js';
import {isArray, isEmptyArray} from '../utilities/collections.js';

class Header {
    static classDebug = true;
    static className = 'Header';

    static drawerOpenClass = 'isDrawerOpen';
    static chevronOpenClass = 'isChevronOpen';

    static hamburgerButtonSelector = '.jsHeaderHamburgerButton';
    static hamburgerRootSelector = '.jsHeaderHamburgerRoot';
    static headerRootSelector = '.jsHeaderRoot';
    static navChevronSelector = '.jsHeaderNavChevron';
    static navItemSelector = '.jsHeaderNavItem';
    static navItemsSelector = '.jsHeaderNavItems';
    static navRootSelector = '.jsHeaderNavRoot';

    #hamburgerButtonElement = null;
    #hamburgerRootElement = null;
    #headerRootElement = null;
    #navChevronElements = null;
    #navItemElements = null;
    #navItemsElements = null;
    #navRootElement = null;

    constructor() {
        this.#initiateInstance();
    }

    #initiateInstance() {
        this.#headerRootElement = document.querySelector(this.constructor.headerRootSelector);

        if (!isElement(this.#headerRootElement)) {
            if (this.constructor.classDebug === true) {
                throw new Error('Element is missing.');
            }

            return;
        }

        this.#hamburgerButtonElement = document.querySelector(this.constructor.hamburgerButtonSelector);
        this.#hamburgerRootElement = document.querySelector(this.constructor.hamburgerRootSelector);
        this.#navChevronElements = Array.from(document.querySelectorAll(this.constructor.navChevronSelector));
        this.#navItemElements = Array.from(document.querySelectorAll(this.constructor.navItemSelector));
        this.#navItemsElements = Array.from(document.querySelectorAll(this.constructor.navItemsSelector));
        this.#navRootElement = document.querySelector(this.constructor.navRootSelector);

        this.#initiateHamburger();
        this.#initiateNavigation();

        this.listenWindowResize = this.listenWindowResize.bind(this);

        window.addEventListener('resize', this.listenWindowResize, false);
    }

    listenWindowResize(event) {
        try {
            this.#deactivateDrawer();
            this.#deactivateChevrons();
        } catch (error) {
            console.log(error);
            // NOTE: Do nothing.
        }
    }



    #initiateHamburger() {
        if (!isElement(this.#hamburgerButtonElement, this.#hamburgerRootElement, this.#navRootElement)) {
            if (this.constructor.classDebug === true) {
                throw new Error('Missing hamburger elements.');
            }

            return;
        }

        this.listenerHamburgerButtonClick = this.listenerHamburgerButtonClick.bind(this);

        this.#deactivateDrawer();

        this.#hamburgerButtonElement.addEventListener('click', this.listenerHamburgerButtonClick, false);
    }



    listenerHamburgerButtonClick(event) {
        event.preventDefault();

        const isActive = this.#hamburgerRootElement.classList.contains(this.constructor.drawerOpenClass) === true;

        if (isActive) {
            this.#deactivateDrawer();
        } else {
            this.#activateDrawer();
        }
    }

    #activateDrawer() {
        this.#hamburgerRootElement.classList.add(this.constructor.drawerOpenClass);
        this.#hamburgerButtonElement.classList.add(this.constructor.drawerOpenClass);
        this.#headerRootElement.classList.add(this.constructor.drawerOpenClass);
        this.#navRootElement.classList.add(this.constructor.drawerOpenClass);
    }

    #deactivateDrawer() {
        this.#hamburgerRootElement.classList.remove(this.constructor.drawerOpenClass);
        this.#hamburgerButtonElement.classList.remove(this.constructor.drawerOpenClass);
        this.#headerRootElement.classList.remove(this.constructor.drawerOpenClass);
        this.#navRootElement.classList.remove(this.constructor.drawerOpenClass);
    }



    #initiateNavigation() {
        if (
            !isElement(this.#navRootElement) ||
            !isArray(this.#navChevronElements, this.#navItemElements, this.#navItemsElements) ||
            isEmptyArray(this.#navChevronElements, this.#navItemElements, this.#navItemsElements)
        ) {
            if (this.constructor.classDebug === true) {
                throw new Error('Missing navigation elements.');
            }

            return;
        }

        this.listenerNavChevronClick = this.listenerNavChevronClick.bind(this);

        for (const navChevronElement of this.#navChevronElements) {
            const navItemElement = navChevronElement.closest(this.constructor.navItemSelector);

            if (!isElement(navItemElement)) {
                if (this.constructor.classDebug === true) {
                    throw new Error('Nav item element is missing.');
                }
                continue;
            }

            const navItemsElement = navItemElement.querySelector(`:scope > ${this.constructor.navItemsSelector}`);

            if (!isElement(navItemsElement)) {
                if (this.constructor.classDebug === true) {
                    throw new Error('Nav items element is missing.');
                }

                continue;
            }

            navChevronElement.navItemElement = navItemElement;
            navChevronElement.navItemsElement = navItemsElement;

            navChevronElement.addEventListener('click', this.listenerNavChevronClick, false);

            this.#deactivateChevron(navChevronElement);
        }
    }

    listenerNavChevronClick(event) {
        event.preventDefault();

        const navChevronElement = event.currentTarget;
        const navItemElement = navChevronElement?.navItemElement;
        const navItemsElement = navChevronElement?.navItemsElement;

        if (!isElement(navChevronElement, navItemElement, navItemsElement)) {
            if (this.constructor.classDebug === true) {
                throw new Error('Nav elements are missing.');
            }

            return;
        }

        const isActive = navItemElement.classList.contains(this.constructor.chevronOpenClass) === true;

        if (isActive) {
            this.#deactivateChevron(navChevronElement);
        } else {
            this.#activateChevron(navChevronElement);
        }
    }

    #activateChevron(navChevronElement) {
        const navItemElement = navChevronElement?.navItemElement;
        const navItemsElement = navChevronElement?.navItemsElement;

        if (!isElement(navChevronElement, navItemElement, navItemsElement)) {
            if (this.constructor.classDebug === true) {
                throw new Error('Nav elements are missing.');
            }

            return;
        }

        navChevronElement.classList.add(this.constructor.chevronOpenClass);
        navItemElement.classList.add(this.constructor.chevronOpenClass);
        navItemsElement.classList.add(this.constructor.chevronOpenClass);
    }

    #deactivateChevron(navChevronElement) {
        const navItemElement = navChevronElement?.navItemElement;
        const navItemsElement = navChevronElement?.navItemsElement;

        if (!isElement(navChevronElement, navItemElement, navItemsElement)) {
            if (this.constructor.classDebug === true) {
                throw new Error('Nav elements are missing.');
            }

            return;
        }

        navChevronElement.classList.remove(this.constructor.chevronOpenClass);
        navItemElement.classList.remove(this.constructor.chevronOpenClass);
        navItemsElement.classList.remove(this.constructor.chevronOpenClass);
    }

    #deactivateChevrons() {
        for (const navChevronElement of this.#navChevronElements) {
            this.#deactivateChevron(navChevronElement);
        }
    }
}

new Header();
