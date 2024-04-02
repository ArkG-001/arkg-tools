import eq from '../src/eq';

describe('eq', () => {
    it('应正确地比较两个值是否等价', () => {
        const object = { a: 1 };
        const other = { a: 1 };
        expect(eq(object, object)).toBe(true);
        expect(eq(object, other)).toBe(false);
        expect(eq('a', 'a')).toBe(true);
        expect(eq('a', Object('a'))).toBe(false);
        expect(eq(NaN, NaN)).toBe(true);
    });
});
