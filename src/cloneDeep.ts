import baseClone from './.internal/baseClone';

/** 用于组合位掩码以进行克隆。 */
const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

/**
 * 此方法类似于 `clone`，但它会递归地克隆 `value`。对象继承会被保留。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要递归克隆的值。
 * @returns {*} 返回深度克隆的值。
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
function cloneDeep(value: any) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

export default cloneDeep;
