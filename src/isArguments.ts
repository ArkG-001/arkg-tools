import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * 检查 `value` 是否可能是一个 `arguments` 对象。
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是一个 `arguments` 对象则返回 `true`，否则返回 `false`。
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value: any) {
    return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export default isArguments;
