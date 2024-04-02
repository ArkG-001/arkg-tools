/**
 * 将数组拆分为指定大小的块 升维.
 * @param arr 需要分割的数组.
 * @param chunkSize 分割后每个数组的长度.
 * @returns 分割后的升维数组.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const chunkedArray = splitArray(arr, 3);
 * console.log(chunkedArray); // 输出: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
function splitArray<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

export default splitArray;
