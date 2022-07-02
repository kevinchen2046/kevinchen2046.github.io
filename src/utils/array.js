module.exports = class ArrayUtil {
    static getItem(array, prop, value) {
        for (var item of array) {
            if (item[prop] == value) {
                return item;
            }
        }
    }
}
