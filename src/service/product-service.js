'use strict';
var _currency = require('util/currency.js');

var _product = {
    //获取商品列表
    getProductList: function (listParam, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/product/list'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    //获取商品详情
    getProductDetail: function (productId, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/product/detail'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _product;