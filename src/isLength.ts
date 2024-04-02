/** 用作各种 `Number` 常量的参考。 */
const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * 检查 `value` 是否为有效的类数组长度。
 *
 * **注意：** 此方法基于 [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength)。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是有效的长度则返回 `true`，否则返回 `false`。
 * @example
 *
 * isLength(3)
 * // => true
 *
 * isLength(Number.MIN_VALUE)
 * // => false
 *
 * isLength(Infinity)
 * // => false
 *
 * isLength('3')
 * // => false
 */
function isLength(value: any): boolean {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

export default isLength;
