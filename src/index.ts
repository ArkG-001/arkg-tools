<<<<<<< HEAD
export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成随机字符 字母数字组合
 * @param min 最小长度
 * @param max 最大长度
 */
export function generateRandomString(min: number, max: number): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
=======
export { default as cloneDeep } from './cloneDeep';
export { default as eq } from './eq';
export { default as isArguments } from './isArguments';
export { default as isArrayLike } from './isArrayLike';
export { default as isBuffer } from './isBuffer';
export { default as isLength } from './isLength';
export { default as isNumber } from './isNumber';
export { default as isObject } from './isObject';
export { default as isObjectLike } from './isObjectLike';
export { default as isTypedArray } from './isTypedArray';
export { default as keys } from './keys';
export { default as keysIn } from './keysIn';
export { default as splitArray } from './splitArray';
>>>>>>> fcc1de7 (feat: 结构化，新增少量方法)
