'use strict';
var _currency = require('util/currency.js');

var _address = {
    //获取地址列表
    getAddressList: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/shipping/list'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //添加新地址
    save: function (addressInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/shipping/add'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //更新地址
    update: function (addressInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/shipping/update'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //删除地址
    deleteAddress: function (shippingId, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/shipping/delete'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //获取单个地址
    getAddress: function (shippingId, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/shipping/select'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },

}

module.exports = _address;