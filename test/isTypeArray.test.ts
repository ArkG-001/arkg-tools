import isTypedArray from '../src/isTypedArray';

// 测试用例
describe('isTypedArray', () => {
    it('应该正确识别类型化数组', () => {
        expect(isTypedArray(new Uint8Array())).toBe(true);
    });

    it('应该正确识别非类型化数组', () => {
        expect(isTypedArray([])).toBe(false);
    });
});
