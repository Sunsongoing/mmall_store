'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _currency = require('util/currency.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');


var page = {
    data: {
        productId: _currency.getUrlParam('productId') || ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //如果没有传productId 返回首页
        if (!this.data.productId) {
            _currency.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _currency.errorToast(errMsg);
            });
        });
    },
    // 加载商品详情数据
    loadDetail: function () {
        var _this= this,
        html = '',
        $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function (res) {
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _currency.renderHtml(templateIndex, res)
            $pageWrap.html(html);
        }, function (err) {
            $pageWrap.html('<p class="err-tip">找不到此商品</p>');
        });
    },
    // 处理数据
    filter:function(data){
        data.subImage =  data.subImage.split(',');
    }

}

$(function () {
    page.init();
});