declare namespace arkgTools {
    /**
     * 深拷贝
     * @param value 传入值
     * @returns 拷贝后的值
     */
    export function cloneDeep(value: any): any;

    /**
     * 比较两个值以确定它们是否等价
     * @param {*} value 要比较的值。
     * @param {*} other 要比较的另一个值。
     * @returns {boolean} 如果值相等，则返回 `true`，否则返回 `false`。
     */
    export function eq(value: any, other: any): boolean;

    /**
     * 检查 `value` 是否可能是一个 `arguments` 对象
     * @param {*} value 要检查的值。
     * @returns {boolean} 若 `value` 是一个 `arguments` 对象则返回 `true`，否则返回 `false`。
     */
    export function isArguments(value: any): boolean;

    /**
     * 检查 `value` 是否类似数组。如果一个值被视为类似数组，那么它不是一个函数，并且具有一个整数类型的 `value.length` 属性，其值大于或等于 `0`，小于或等于 `Number.MAX_SAFE_INTEGER`。
     * @param {*} value 要检查的值。
     * @returns {boolean} 若 `value` 类似数组则返回 `true`，否则返回 `false`。
     */
    export function isArrayLike(value: any): boolean;

    /**
     * 检查 `value` 是否为缓冲区。
     * @param {*} value 要检查的值。
     * @returns {boolean} 若 `value` 是缓冲区则返回 `true`，否则返回 `false`。
     */
    export function isBuffer(value: any): boolean;

    /**
     * 检查 `value` 是否为有效的类数组长度。
     * @param {*} value 要检查的值。
     * @returns {boolean} 若 `value` 是有效的长度则返回 `true`，否则返回 `false`。
     */
    export function isLength(value: any): boolean;

    /**
     * 检查 `value` 是否被归类为 `Number` 原始类型或对象。
     * @param {*} value 要检查的值。
     * @returns {boolean} 若 `value` 是数字则返回 `true`，否则返回 `false`。
     */
    export function isNumber(value: any): boolean;
}

declare module 'arkg-tools' {
    export = arkgTools;
}
