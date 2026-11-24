function isObject(...objects) {
    const result = objects.every(object => object && Object.getPrototypeOf(object) === Object.prototype);
    return result;
}

function isEmptyObject(...objects) {
    const result = objects.every(object => isObject(object) && Object.getOwnPropertyNames(object).length < 1);
    return result;
}

function isArray(...arrays) {
    const result = arrays.every(array => Array.isArray(array) === true);
    return result;
}

function isEmptyArray(...arrays) {
    const result = arrays.every(array => isArray(array) && array.length < 1);
    return result;
}

function uniquifyArray(array) {
    const result = [...new Set(array)];
    return result;
}

function isMap(...maps) {
    const result = maps.every(map => map instanceof Map);
    return result;
}

function isEmptyMap(...maps) {
    const result = maps.every(map => isMap(map) && map.size === 0);
    return result;
}

export {isObject, isEmptyObject, isArray, isEmptyArray, uniquifyArray, isMap, isEmptyMap};

