/**
 * 执行 [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * 比较两个值以确定它们是否等价。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要比较的值。
 * @param {*} other 要比较的另一个值。
 * @returns {boolean} 如果值相等，则返回 `true`，否则返回 `false`。
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * eq(object, object)
 * // => true
 *
 * eq(object, other)
 * // => false
 *
 * eq('a', 'a')
 * // => true
 *
 * eq('a', Object('a'))
 * // => false
 *
 * eq(NaN, NaN)
 * // => true
 */
function eq(value: any, other: any): boolean {
    return value === other || (value !== value && other !== other);
}

export default eq;
