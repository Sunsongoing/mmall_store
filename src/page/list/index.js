'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _currency = require('util/currency.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        //分页信息
        listParam: {
            keywords: _currency.getUrlParam('keyword') || '',
            categoryId: _currency.getUrlParam('categoryId') || '',
            orderBy: _currency.getUrlParam('orderBy') || 'default',
            pageNum: _currency.getUrlParam('pageNum') || 1,
            pageSize: _currency.getUrlParam('pageSize') || 2,
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        //排序点击事件
        $('.sort-item').click(function () {
            var $this = $(this);

            switch ($this.data('type')) {
                //默认排序
                case 'default':
                    //已经是active样式
                    if ($this.hasClass('active')) {
                        return;
                    } else {
                        //为当前点击的元素添加样式，并移除兄弟元素的排序样式
                        $this.addClass('active').siblings('.sort-item')
                            .removeClass('active asc desc');
                        //传递给后台的排序参数为default
                        _this.data.listParam.orderBy = 'default';
                    }

                    break;
                    //价格排序
                case 'price':
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    //升序降序的处理
                    if (!$this.hasClass('asc')) {
                        //点击价格排序，默认升序
                        $this.addClass('asc').removeClass('desc');
                        _this.data.listParam.orderBy = 'price_asc';
                    } else {
                        $this.addClass('desc').removeClass('asc');
                        _this.data.listParam.orderBy = 'price_desc';
                    }
                    //重新加载列表
                    _this.loadList();

                    break;

                default:
                    break;
            }
        });
    },
    // 加载list数据
    loadList: function () {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        // //加载loading图片
        // $pListCon.html('<div class="loading"></div>');
        //删除不必要的字段
        listParam.categoryId ? (delete listParam.keyword) :
            (delete listParam.categoryId);
        //请求数据
        _product.getProductList(listParam, function (res) {
            listHtml = _currency.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            //加载分页信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (err) {
            _currency.errorToast(err);
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
                _this.loadList();
            }
        }));
    }

}
$(function () {
    page.init();
});