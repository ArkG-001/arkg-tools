import isObjectLike from '../src/isObjectLike';

describe('isObjectLike', () => {
    it('应该正确识别类似对象', () => {
        expect(isObjectLike({})).toBe(true);
        expect(isObjectLike([1, 2, 3])).toBe(true);
    });

    it('应该正确识别非类似对象', () => {
        expect(isObjectLike(Function)).toBe(false);
        expect(isObjectLike(null)).toBe(false);
    });
});
