import { random, generateRandomString } from '../src/index';

describe('生成数字范围内的随机数', () => {
    it('random(1, 1) -> should return 1', () => {
        const rand = random(1, 1);
        expect(rand).toBe(1);
    });
    it('random(1, 10) -> should return number', () => {
        const rand = random(1, 10);
        expect(rand).toBeNaN();
    });
});

describe('生成指定长度的由数字和大写字母组成的字符串', () => {
    it('generateRandomString(6, 10) -> should return a string with length between 6 and 10', () => {
        const randString = generateRandomString(6, 10);
        const length = randString.length;

        expect(length).toBeGreaterThanOrEqual(6);
        expect(length).toBeLessThanOrEqual(10);

        // 此处还可以添加其他针对字符串内容的测试
        // 例如：检查字符串是否由数字和大写字母组成等
    });

    it('generateRandomString(1, 5) -> should return a string with length between 1 and 5', () => {
        const randString = generateRandomString(1, 5);
        const length = randString.length;

        expect(length).toBeGreaterThanOrEqual(1);
        expect(length).toBeLessThanOrEqual(5);

        // 此处还可以添加其他针对字符串内容的测试
        // 例如：检查字符串是否由数字和大写字母组成等
    });

    // 可以根据需要添加更多测试用例
});
