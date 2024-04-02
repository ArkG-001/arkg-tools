import root from './.internal/root';

/* 用于与其他 `lodash` 方法同名的内置方法的引用。 */
const nativeIsBuffer = root?.Buffer?.isBuffer;

/**
 * 检查 `value` 是否为缓冲区。
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是缓冲区则返回 `true`，否则返回 `false`。
 * @example
 *
 * isBuffer(Buffer.alloc(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
const isBuffer = typeof nativeIsBuffer === 'function' ? nativeIsBuffer : () => false;

export default isBuffer;
