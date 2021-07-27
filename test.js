let {Order} = require('.');
let {NewOrder} = require('./index-new');

let originalOrder = '0356\n\
0358干锅娃娃菜\n\
0205 拍黄瓜\n\
牛腩炖时蔬\n\
红焖羊肉\n\
0329\n\
豆腐\n';

let reorder = new Order(originalOrder);
console.log(reorder.finalOrder);

let neworder = new NewOrder();
neworder.buildOrder(originalOrder).then(result => {
    console.log(result);
});
