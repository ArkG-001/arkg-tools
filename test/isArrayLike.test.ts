import { JSDOM } from 'jsdom';
import isArrayLike from '../src/isArrayLike';

describe('isArrayLike', () => {
    let dom: JSDOM;

    beforeAll(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        // 将全局的 document 对象替换为 JSDOM 提供的 document 对象
        global.document = dom.window.document;
    });

    afterAll(() => {
        // 清理全局的 document 对象
        //@ts-ignore
        delete global.document;
        // 关闭 JSDOM
        dom.window.close();
    });

    it('应正确识别类数组对象', () => {
        // 使用模拟的 document 对象进行测试
        expect(isArrayLike(document.body.children)).toBe(true);
    });

    it('应正确识别字符串', () => {
        expect(isArrayLike('abc')).toBe(true);
    });

    it('应正确识别空对象', () => {
        expect(isArrayLike({})).toBe(false);
    });
});
