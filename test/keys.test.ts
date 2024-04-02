import keys from '../src/keys';

// 测试用例
describe('keys', () => {
    it('应该返回一个由对象的自身可枚举属性名组成的数组', () => {
        function Foo() {
            this.a = 1;
            this.b = 2;
        }

        Foo.prototype.c = 3;

        const fooInstance = new Foo();
        const properties = keys(fooInstance);

        expect(properties).toContain('a');
        expect(properties).toContain('b');
        expect(properties).not.toContain('c'); // 不应包含继承的属性名
    });

    it('应该正确处理字符串', () => {
        const str = 'hi';
        const strProperties = keys(str);

        expect(strProperties).toContain('0');
        expect(strProperties).toContain('1');
    });
});
