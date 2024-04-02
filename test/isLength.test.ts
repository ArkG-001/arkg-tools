import isLength from '../src/isLength';

describe('isLength', () => {
    it('应该正确识别有效长度', () => {
        expect(isLength(3)).toBe(true);
    });

    it('应该正确识别无效长度', () => {
        expect(isLength(Number.MIN_VALUE)).toBe(false);
        expect(isLength(Infinity)).toBe(false);
        expect(isLength('3')).toBe(false);
    });
});
