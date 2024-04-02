import isNumber from '../src/isNumber';

describe('isNumber', () => {
    it('应该正确识别数字', () => {
        expect(isNumber(3)).toBe(true);
        expect(isNumber(Number.MIN_VALUE)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
    });

    it('应该正确识别非数字', () => {
        expect(isNumber('3')).toBe(false);
    });
});
