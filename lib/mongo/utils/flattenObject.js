export function flattenObject(obj, options = {}) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    const flatObject = {};
    for (const propName of Object.keys(obj)) {
        const value = obj[propName];
        if (typeof value === 'object') {
            flattenNestedProperty(propName, value, flatObject, options);
        }
        else {
            flatObject[propName] = value;
        }
    }
    return flatObject;
}
function flattenNestedProperty(parentPropertyName, source, result, options) {
    const flattenValue = (value, propName, result) => {
        if (value && typeof value === 'object') {
            flattenNestedProperty(propName, value, result, options);
        }
        else {
            result[propName] = value;
        }
    };
    if (Array.isArray(source)) {
        if (options.shouldReplaceArrays) {
            result[parentPropertyName] = source;
        }
        else {
            for (let i = 0; i < source.length; i++) {
                const flatPropertyName = `${parentPropertyName}.${i}`;
                flattenValue(source[i], flatPropertyName, result);
            }
        }
    }
    else {
        for (const propName of Object.keys(source)) {
            const value = source[propName];
            const flatPropertyName = `${parentPropertyName}.${propName}`;
            flattenValue(value, flatPropertyName, result);
        }
    }
}
