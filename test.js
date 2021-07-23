let {Order} = require('./main-drafts-v4');

let currentOrder = '0356\n\
0358干锅娃娃菜\n\
0205 拍黄瓜\n\
牛腩炖时蔬\n\
红焖羊肉\n\
0329\n\
豆腐\n';

let order = new Order(currentOrder);
console.log(order.final_order());
