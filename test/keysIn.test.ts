import keysIn from '../src/keysIn';

// 测试用例
describe('keysIn', () => {
    it('应该返回一个由对象的自身和继承的可枚举属性名组成的数组', () => {
        function Foo() {
            this.a = 1;
            this.b = 2;
        }

        Foo.prototype.c = 3;

        const fooInstance = new Foo();
        const properties = keysIn(fooInstance);

        expect(properties).toContain('a');
        expect(properties).toContain('b');
        expect(properties).toContain('c');
    });
});
