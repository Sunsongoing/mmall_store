'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _currency = require('util/currency.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        //分页信息
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },
    //加载订单列表
    loadOrderList: function () {
        var _this = this,
        orderListHtml = '',
        // list容器
        $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function (res) {
            orderListHtml = _currency.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (err) {
            $listCon.html('<p class="err-tip">加载订单失败,请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        _this.pagination ? '' : (_this.pagination = new Pagination());
        _this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }

}
$(function () {
    page.init();
});