function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 生成随机字符 字母数字组合
 * @param min 最小长度
 * @param max 最大长度
 */
function generateRandomString(min, max) {
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = Math.floor(Math.random() * (max - min + 1)) + min;
    var result = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export { generateRandomString, random };
