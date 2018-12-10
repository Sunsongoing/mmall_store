'use strict';
var _currency = require('util/currency.js');

var _cart = {
    // 获取购物车数量
    getCartCount:function(resolve,reject){
        _currency.request({
            url     : _currency.getServerUrl('/cart/get_cart_product_count'),
            success : resolve,
            error   : reject 
        });
    },
    //获取购物车列表
    getCartList: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/list'),
            success: resolve,
            error: reject
        });
    },
    //选择购物车商品
    selectProduct: function (productId, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/select'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //添加到购物车
    addToCart: function (productInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/add'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    //取消选择购物车商品
    unselectProduct: function (productId, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/un_select'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //全选购物车商品
    selectAllProduct: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/select_all'),
            success: resolve,
            error: reject
        });
    },
    //取消全选购物车商品
    unselectAllProduct: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/un_select_all'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateProduct: function (productInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/update'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除指定商品
    deleteProduct: function (productIds, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/cart/delete_product'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _cart;