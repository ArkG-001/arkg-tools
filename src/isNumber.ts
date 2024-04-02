import getTag from './.internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * 检查 `value` 是否被归类为 `Number` 原始类型或对象。
 *
 * **注意：** 要排除 `Infinity`、`-Infinity` 和 `NaN`，这些被归类为数字，可使用 `Number.isFinite` 方法。
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是数字则返回 `true`，否则返回 `false`。
 * @see isInteger, toInteger, toNumber
 * @example
 *
 * isNumber(3)
 * // => true
 *
 * isNumber(Number.MIN_VALUE)
 * // => true
 *
 * isNumber(Infinity)
 * // => true
 *
 * isNumber('3')
 * // => false
 */
function isNumber(value: any): boolean {
    return (
        typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]')
    );
}

export default isNumber;
