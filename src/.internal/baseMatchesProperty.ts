import baseIsEqual from './baseIsEqual';
import get from '../get';
import hasIn from '../hasIn';
import isKey from './isKey';
import isStrictComparable from './isStrictComparable';
import matchesStrictComparable from './matchesStrictComparable';
import toKey from './toKey';

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
    }
    return (object) => {
        const objValue = get(object, path);
        return objValue === undefined && objValue === srcValue
            ? hasIn(object, path)
            : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
}

export default baseMatchesProperty;
