import splitArray from '../src/splitArray';

describe('splitArray', () => {
    test('应该将数组拆分为给定大小的块', () => {
        const arr = [1, 2, 3, 4, 5, 6];
        const chunkSize = 2;
        const expectedResult = [
            [1, 2],
            [3, 4],
            [5, 6],
        ];
        expect(splitArray(arr, chunkSize)).toEqual(expectedResult);
    });

    test('即使块大小大于数组长度，也应将数组拆分为块', () => {
        const arr = [1, 2, 3, 4, 5];
        const chunkSize = 7;
        const expectedResult = [[1, 2, 3, 4, 5]];
        expect(splitArray(arr, chunkSize)).toEqual(expectedResult);
    });

    test('如果输入数组为空，则应返回一个空数组', () => {
        const arr: never[] = [];
        const chunkSize = 2;
        const expectedResult: any[] = [];
        expect(splitArray(arr, chunkSize)).toEqual(expectedResult);
    });

    test('应将数组拆分为大小为1的块', () => {
        const arr = [1, 2, 3, 4, 5];
        const chunkSize = 1;
        const expectedResult = [[1], [2], [3], [4], [5]];
        expect(splitArray(arr, chunkSize)).toEqual(expectedResult);
    });

    test('应将数组拆分为大小不等的块', () => {
        const arr = [1, 2, 3, 4, 5];
        const chunkSize = 3;
        const expectedResult = [
            [1, 2, 3],
            [4, 5],
        ];
        expect(splitArray(arr, chunkSize)).toEqual(expectedResult);
    });
});
