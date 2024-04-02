/**
 * 检查 `value` 是否类似对象。如果 `value` 不是 `null` 并且 `typeof` 结果是 "object"，则视为类似对象。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 类似对象则返回 `true`，否则返回 `false`。
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
function isObjectLike(value: any): boolean {
    return typeof value === 'object' && value !== null;
}

export default isObjectLike;
