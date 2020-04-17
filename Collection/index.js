module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.arr = []
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.arr;
};
// другие методы
Collection.prototype.append = function (data) {
    if (data instanceof Collection) {        
        for (let i = 0; i < data.count(); i++) {
            this.arr.push(data.arr[i]);
        }
    } else {
        this.arr.push(data);
    }
};
Collection.prototype.count = function () {
    return this.arr.length;
};
Collection.prototype.at = function (i) {
    return this.arr[i-1];
};
Collection.prototype.removeAt = function (i) {
if (i < 1 || i > this.arr.length){
    return false;
}
    this.arr.splice(i-1, 1);
    return true;
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (input) {
    let A = new Collection();
    A.arr = input;
    return A;
};
