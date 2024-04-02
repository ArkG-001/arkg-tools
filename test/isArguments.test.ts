import isArguments from '../src/isArguments';

describe('isArguments', () => {
    it('应正确识别 arguments 对象', () => {
        expect(
            isArguments(
                (function () {
                    return arguments;
                })(),
            ),
        ).toBe(true);
    });

    it('应正确识别非 arguments 对象', () => {
        expect(isArguments([1, 2, 3])).toBe(false);
    });
});
