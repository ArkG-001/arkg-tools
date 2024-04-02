import getTag from './.internal/getTag';
import nodeTypes from './.internal/nodeTypes';
import isObjectLike from './isObjectLike';

/** 用于匹配类型化数组的 `toStringTag` 值的正则表达式。 */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;

/* Node.js 辅助函数引用。 */
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;

/**
 * 检查 `value` 是否被归类为类型化数组。
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是类型化数组则返回 `true`，否则返回 `false`。
 *
 * @example
 * // 示例用法：
 *
 * console.log(isTypedArray(new Uint8Array())); // 输出: true
 * console.log(isTypedArray([])); // 输出: false
 */
const isTypedArray = nodeIsTypedArray
    ? (value: any) => nodeIsTypedArray(value)
    : (value: any) => isObjectLike(value) && reTypedTag.test(getTag(value));

export default isTypedArray;
