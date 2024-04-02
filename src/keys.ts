import arrayLikeKeys from './.internal/arrayLikeKeys';
import isArrayLike from './isArrayLike';

/**
 * 创建一个由对象的自身可枚举属性名组成的数组。
 *
 * **注意：** 非对象值会被强制转换为对象。更多细节请参阅 [ECMAScript 规范](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)。
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object 要查询的对象。
 * @returns {Array} 返回属性名的数组。
 * @see values, valuesIn
 *
 * @example
 * // 示例用法：
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * const fooInstance = new Foo();
 * const properties = keys(fooInstance);
 * console.log(properties); // 输出: ['a', 'b']（迭代顺序不保证）
 *
 * const str = 'hi';
 * const strProperties = keys(str);
 * console.log(strProperties); // 输出: ['0', '1']
 */
function keys(object: any): string[] {
    return isArrayLike(object) ? arrayLikeKeys(object) : Object.keys(Object(object));
}

export default keys;
