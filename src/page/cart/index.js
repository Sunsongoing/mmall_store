'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _currency = require('util/currency.js');
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
        this.loadCart();
    },
    bindEvent: function () {
        var _this = this;
        //商品选择 & 取消选择
        $(document).on('click', '.cart-select', function (e) {
            var $this = $(this),
                productId = $this.parent('.cart-table').data('productId');
            //    切换选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError(err);
                });
            }
            // 取消选中
            else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError(err);
                });
            }
        });
        // 商品全选 & 取消全选
        $(document).on('click', '.cart-select-all', function (e) {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            //    切换选中状态
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError(err);
                });
            }
            // 取消选中
            else {
                _cart.unselectAllProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (err) {
                    _this.showCartError(err);
                });
            }
        });

        // 商品数量的变化
        $(document).on('click', '.count-btn', function (e) {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _currency.errorToast('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (err) {
                _this.showCartError(err);
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function (e) {
            if (window.confirm('确认要删除该商品?')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中的商品
        $(document).on('click', '.delete-selected', function (e) {
            if (window.confirm('确认要删除选中商品?')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productId
                for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(productIds.join(','));
                } else {
                    _currency.errorToast("您还没有选中要删除的商品");
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function (e) {
            //总价大于零 ,进行提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                //跳转到订单确认页
                window.location.href = './order-confirm.html';
            } else {
                _currency.errorToast("请选择商品后再提交");
            }
        });
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (err) {
            _this.showCartError(err);
        });
    },
    // 渲染购物车
    renderCart: function (data) {
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        //生成html
        var cartHtml = _currency.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航的购物车更新数量
        nav.loadCartCount();
    },
    //删除指定商品,批量删除使用 逗号 分割productId
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (err) {
            _this.showCartError(err);
        });
    },
    // 处理数据
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function (err) {
        console.log(err);
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试</P>');
    }

}

$(function () {
    page.init();
});