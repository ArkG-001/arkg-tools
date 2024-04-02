import isArguments from '../isArguments';
import isBuffer from '../isBuffer';
import isIndex from './isIndex';
import isTypedArray from '../isTypedArray';

/** 用于检查对象是否具有自身属性。 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 创建一个由数组类似值的可枚举属性名组成的数组。
 *
 * @private
 * @param {*} value 要查询的值。
 * @param {boolean} inherited 指定是否返回继承的属性名。
 * @returns {Array} 返回属性名的数组。
 *
 * @example
 * // 示例用法：
 *
 * const arr = ['a', 'b', 'c'];
 * const result = arrayLikeKeys(arr, true);
 * console.log(result); // 输出: ['0', '1', '2', 'length']
 */
function arrayLikeKeys(value: any, inherited?: boolean): string[] {
    const isArr = Array.isArray(value);
    const isArg = !isArr && isArguments(value);
    const isBuff = !isArr && !isArg && isBuffer(value);
    const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
    const skipIndexes = isArr || isArg || isBuff || isType;
    const length = value.length;
    const result: string[] = new Array(skipIndexes ? length : 0);
    let index = skipIndexes ? -1 : length;
    while (++index < length) {
        result[index] = `${index}`;
    }
    for (const key in value) {
        if (
            (inherited || hasOwnProperty.call(value, key)) &&
            !(
                skipIndexes &&
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key === 'length' ||
                    // Skip index properties.
                    isIndex(key, length))
            )
        ) {
            result.push(key);
        }
    }
    return result;
}

export default arrayLikeKeys;
