'use strict';
var _currency = require('util/currency.js');

var _payment = {
    //获取支付二维码
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/pay'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //获取订单状态
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/order/query_order_pay_status'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
}

module.exports = _payment;