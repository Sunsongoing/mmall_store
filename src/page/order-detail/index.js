'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _currency = require('util/currency.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _currency.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载detail数据
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确认取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _currency.successToast("该订单取消成功");
                    _this.loadDetail();
                }, function (err) {
                    _currency.errorToast(err);
                });
            }
        });
    },
    // 加载detail数据
    loadDetail: function () {
        var _this = this,
        orderDetailHtml = '',
            $content = $('.content');

        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(_this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            orderDetailHtml = _currency.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (err) {
            $content.html('<p class="err-tip">' + err + '</p>');
        });
    },
    // 数据适配
    dataFilter: function (data) {
        data.needPay = data.status == 10;
        data.isCancelble = data.status == 10;
    }
}

$(function () {
    page.init();
});