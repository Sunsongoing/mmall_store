'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _currency = require('util/currency.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
//自定义模态框
var addressModal = require('./address-modal.js');

var page = {
    data: {
        selectedAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        // 地址选择
        $(document).on('click', '.address-item', function (e) {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单提交
        $(document).on('click', '.order-submit', function (e) {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (err) {
                    _currency.errorToast(err);
                });
            } else {
                _currency.errorToast('请选择地址后再提交');
            }
        });
        // 添加新地址
        $(document).on('click', '.address-add', function (e) {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            });
        });
        // 编辑地址
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            }, function (err) {
                _currency.errorToast(err);
            });
        });
        // 删除地址
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址吗？')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList();
                }, function (err) {
                    _currency.errorToast(err);
                });
            }
        });
    },
    //加载地址列表
    loadAddressList: function () {
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHtml = _currency.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (err) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    // 处理重新加载地址列表后的地址选中状态
    addressFilter: function (data) {
        if (this.data.selectedAddressId) {
            var flag = false;
            //遍历地址列表，是否有被选中的地址
            for (var index = 0, length = data.list.length; index < length; index++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    flag = true;
                }
            }
            //如果刷新地址列表前选中的地址不在列表中，将其删除
            if (!flag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    //加载商品清单
    loadProductList: function () {
        $('.product-con').html('<div class="loading"></div>');

        _order.getProductList(function (res) {
            var productListHtml = _currency.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (err) {
            $('.product-con').html('<p class="err-tip">商品加载失败，请刷新后重试</p>');
        });
    }
};

$(function () {
    page.init();
});