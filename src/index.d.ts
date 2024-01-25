declare namespace arkgTools {
    /**
     * 生成数字范围内的随机数
     * @param min 最小数字
     * @param max 最大数字
     * @returns number类型
     */
    export function random(min: number, max: number): number;

    /**
     * 生成指定长度的由数字和大写字母组成的字符串
     * @param min 最小长度
     * @param max 最大长度
     * @returns 生成的随机字符串
     */
    export function generateRandomString(min: number, max: number): string;
}

declare module 'arkg-tools' {
    export = arkgTools;
}
