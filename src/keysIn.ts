/**
 * 创建一个由对象的自身和继承的可枚举属性名组成的数组。
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object 要查询的对象。
 * @returns {Array} 返回属性名的数组。
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
 * const properties = keysIn(fooInstance);
 * console.log(properties); // 输出: ['a', 'b', 'c']（迭代顺序不保证）
 */
function keysIn(object: Record<string, any>): string[] {
    const result: string[] = [];
    for (const key in object) {
        result.push(key);
    }
    return result;
}

export default keysIn;
