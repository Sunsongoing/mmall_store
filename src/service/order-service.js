'use strict';
var _currency = require('util/currency.js');

var _order = {
    //获取商品列表
    getProductList: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/get_order_cart_product'),
            success: resolve,
            error: reject
        });
    },
    //提交订单
    createOrder: function (orderInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/create'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    //获取订单列表
    getOrderList: function (listParam, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/list'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取订单详情
    getOrderDetail: function (orderNumber, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/detail'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    // 取消订单
    cancelOrder:function (orderNumber, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/cancel'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },

}

module.exports = _order;