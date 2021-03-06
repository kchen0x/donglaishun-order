class Order {
    constructor(originalOrder) {
        const menu = [
            '0208 川北凉粉',
            '0209 酸辣海带丝',
            '0203 果仁菠菜',
            '0210 香油苦瓜',
            '0205 拍黄瓜',
            '021 凉拌腐竹',
            '0206 香椿苗拌豆腐丝',
            '0212 黄豆芽莜菜拌蕨根粉',
            '0218 石锅豆腐鱼',
            '0258 酸辣土豆丝',
            '0219 粉蒸牛肉',
            '0259 酸菜粉丝',
            '020 秘制酸汤龙利鱼',
            '0226 韭菜炒鸡蛋',
            '0221 回锅牛肉',
            '0260 肉沫酸豆角',
            '022 馋嘴大虾',
            '0261 松仁玉米',
            '023 馋嘴胖头鱼',
            '0262 訾香茄子',
            '0225 馋嘴耗儿鱼',
            '0228 馋嘴素什锦',
            '0265 干煸豆角',
            '0263 西红柿炒鸡蛋',
            '0229 酸菜炒山笋',
            '0266 虎皮尖椒',
            '0230 金汤酸菜鱼',
            '0268 小炒香干',
            '0231 慢火炖羊杂汤配烧饼(2个) ',
            '0232 满口香爽藕丁',
            '0233 砂煲霸王肚',
            '0281 毛豆仁烧茄丁',
            '0235 红焖羊肉红薯粉条',
            '0282 圆白菜炒粉条',
            '0238 鱼香牛肉丝',
            '0283 香芹炒香干',
            '0239 凉瓜豆豉尖椒炒牛肉',
            '0285 炒合菜',
            '0286 炝炒油菜腐竹',
            '0250 杏鲍菇炒牛肉',
            '0288 黄豆芽肉丝炒粉条',
            '0289 珍菌日本豆腐',
            '0251 手掰豆腐炖牛腩',
            '0252 小炒牛肉',
            '0253 葱爆羊肉',
            '0255 水煮牛肉',
            '0292 地三鲜',
            '0256 麻婆豆腐',
            '0293 白灼金菇肥牛',
            '0295 尖椒炒豆皮   ',
            '0320 辣椒炒鸡片 ',
            '0296 毛豆仁烧丝瓜',
            '0321 鱼香鸡丝',
            '0298 苦瓜炒鸡蛋 ',
            '0322 青笋炒肉片',
            '0302 金针菇扒时蔬 ',
            '0323 水煮鸡片',
            '0305 烤味鸡丁',
            '0325 砂锅山药 ',
            '0306 萝卜干炒牛肉',
            '0326 芽菜碎米鸡',
            '0308 酸包菜炒粉条',
            '0328 乡味嫩牛肉',
            '0329 牛腩炖时蔬',
            '0309 红烧鱼面筋',
            '0310 家乡大碗菜',
            '0330 茶树菇炒牛肉丝',
            '0311 肉沫窝蛋扒时蔬',
            '0331 鲜香菇炒牛肉丝',
            '0332 京酱牛肉丝',
            '0315 大盘冬瓜',
            '0333 家常豆腐',
            '0316 小炒有机菜花',
            '0335 酸萝卜炒粉条',
            '0318 山药木耳炒青笋',
            '0336 青豆烩口蘑',
            '0319 回锅鱼片',
            '0338 木须肉',
            '0339 干锅白菜',
            '0355 干锅手撕包菜',
            '0350 干锅土豆片',
            '0356 干锅千页豆腐',
            '0351 干锅杏鲍菇',
            '0358 干锅娃娃菜',
            '0352 干锅杂菌',
            '0353 锅仔酸菜羊肉',
            '0359 干锅鱼豆腐',
            '0360 干锅鱼籽',
            '0361 西红柿鸡蛋汤',
            '0366 紫菜鸡蛋汤',
            '0362 酸菜粉丝汤',
            '0368 酸辣汤',
            '0363 海米萝卜丝汤',
            '0369 疙瘩汤',
            '0365 菌汤虾滑汤',
            '0380 海米冬瓜汤',
            '0381 米饭',
            '0382 孜然炒面',
            '0383 酱油炒饭',
        ];

        this.originalOrder = originalOrder;
        this.finalOrder = function () {
            let order = [];
            let patt = /\d{3,}/;
            let orderNum = 0;

            let lines = this.originalOrder.split('\n');

            lines.forEach(line => {
                if (line.length == 0) {
                    return false;
                }
                if (orderNum = line.match(patt)) {
                    menu.forEach(dish => {
                        if (dish.match(orderNum + ' ')) {
                            order.push(dish);
                        }
                    });
                } else {
                    let ordered = false;
                    menu.forEach(dish => {
                        if (ordered) {
                            return false;
                        }
                        if (dish.match(line)) {
                            order.push(dish);
                            ordered = true;
                        }
                    });
                }
            });
            return order.sort().join('\n') + '\n\n' + order.length + ' 人';
        };
    }
}

if (typeof draft !== 'undefined') {
    const originalOrder = draft.content;
    let order = new Order(originalOrder);
    draft.content = order.finalOrder();
}

if (typeof module !== 'undefined') {
    module.exports = {
        Order: Order
    };
}