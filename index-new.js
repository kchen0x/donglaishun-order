const https = require('https');
const menuUrl = 'https://service-8450sl36-1253601653.gz.apigw.tencentcs.com/release/donglaishun-menu';

function getMenu(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, resp => {
                let data = '';
                // A chunk of data has been received.
                resp.on('data', chunk => {
                    data += chunk;
                });
                resp.on('end', () => {
                    try {
                        let result = JSON.parse(data);
                        resolve(result.records);
                    } catch (err) {
                        reject({
                            message: 'JSON parse error'
                        });
                    }
                });
            })
            .on('error', err => {
                reject(err);
            });
    });
}

function Order() {
    this.menu = [];

    this.buildMenu = async function () {
        let menu = await getMenu(menuUrl).catch(err => {
            console.log(err);
        });

        return (menu || [])
            .filter(item => {
                return item.fields.name;
            })
            .map(item => {
                let dish = item.fields;
                return {
                    number: dish.index,
                    name: dish.name,
                    fullName: dish.index + ' ' + dish.name
                };
            });
    };

    this.getItemByKey = function (array, value, key) {
        let result = (array || []).filter(item => {
            if (item[key] + '' === value + '') {
                return true;
            } else if (value.length > 2) {
                return item[key].indexOf(value) > -1;
            }
            return false;
        });
        return result[0];
    };

    this.buildOrder = async function (order) {
        this.menu = await this.buildMenu();

        let result = [];
        let pattern = /\d{3,}/;
        let flag = {};

        let lines = order.split('\n');

        lines.forEach(dish => {
            if (!dish) {
                return;
            }
            let orderNumber = dish.match(pattern);
            let target;
            if (orderNumber) {
                target = this.getItemByKey(this.menu, orderNumber[0], 'number');
            } else {
                target = this.getItemByKey(this.menu, dish, 'name');
            }
            if (target && !flag[target.number]) {
                result.push(target.fullName);
                flag[target.number] = true;
            }
        });
        return result.sort().join('\n') + '\n\n' + result.length + ' 人';
    };
}

async function generateOrder(target) {
    const originalOrder = target.content;
    let order = new Order();
    target.content = await order.buildOrder(originalOrder);
}

if (typeof module !== 'undefined') {
    module.exports = {
        NewOrder: Order
    };
}

if (typeof draft !== 'undefined') {
    generateOrder(draft);
}
