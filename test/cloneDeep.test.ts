import cloneDeep from '../src/cloneDeep';

describe('cloneDeep', () => {
    it('应正确地深度克隆对象', () => {
        const objects = [{ a: 1 }, { b: 2 }];
        const deep = cloneDeep(objects);
        expect(deep[0]).not.toBe(objects[0]);
    });
});
