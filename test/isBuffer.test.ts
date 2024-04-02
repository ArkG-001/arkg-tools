import isBuffer from '../src/isBuffer';

describe('isBuffer', () => {
    it('应正确识别缓冲区', () => {
        expect(isBuffer(Buffer.alloc(2))).toBe(true);
    });

    it('应正确识别非缓冲区', () => {
        expect(isBuffer(new Uint8Array(2))).toBe(false);
    });
});
