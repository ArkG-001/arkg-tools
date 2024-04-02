import isObject from '../src/isObject';

describe('isObject', () => {
    it('应该正确识别对象', () => {
        expect(isObject({})).toBe(true);
        expect(isObject([1, 2, 3])).toBe(true);
        expect(isObject(Function)).toBe(true);
    });

    it('应该正确识别非对象', () => {
        expect(isObject(null)).toBe(false);
    });
});
