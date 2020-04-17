/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {    
    if (operations.length == 0) {
        callback(null, []);
        return;
    }

    let n = 0;
    let result = [];

    function makeNext() {
        const count = n;
        n++;
        return function next(err, data) {
            if (err) {
                callback(err);
            } else {
                result[count] = data;
                n--;
                if (n == 0) {
                    callback(null, result);
                }
            };
        }
    }

    operations.forEach((item) => { item(makeNext()) });
};