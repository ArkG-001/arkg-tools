import isLength from './isLength';

/**
 * 检查 `value` 是否类似数组。如果一个值被视为类似数组，那么它不是一个函数，并且具有一个整数类型的 `value.length` 属性，其值大于或等于 `0`，小于或等于 `Number.MAX_SAFE_INTEGER`。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 类似数组则返回 `true`，否则返回 `false`。
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
function isArrayLike(value: any) {
    return value != null && typeof value !== 'function' && isLength(value.length);
}

export default isArrayLike;
