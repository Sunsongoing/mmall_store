'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _currency = require('util/currency.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _currency.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        // 加载PaymentInfo数据
        this.loadPaymentInfo();
    },
    // 加载detail数据
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');

        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber, function (res) {
            // 渲染html
            paymentHtml = _currency.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            // 监听订单状态
            _this.listenOrderStatus();
        }, function (err) {
            $pageWrap.html('<p class="err-tip">' + err + '</p>');
        });
    },
    listenOrderStatus: function () {
        var _this = this;
        //5s 一次  
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res, msg) {
                if (res === true) {
                    window.location.href =
                        './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                } else if (res === false && msg ==="超过时间未支付，订单自动关闭") {
                    window.location.href =
                        './result.html?type=order-closed&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5000);;
    }
}

$(function () {
    page.init();
});