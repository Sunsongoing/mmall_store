'use strict';
require('./index.css');
var _currency = require('util/currency.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function () {
        //登录
        $('.js-login').click(function () {
            _currency.doLogin();
        });
        //注册
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        //退出
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (err) {
                _currency.errToast(err);
            });
        });
    },
    //加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (err) {
            //todo
            console.log(err);
        });
    },
    // 加载购物车数量
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (err) {
            $('.nav .cart-count').text(0);
        });
    }
}

module.exports = nav.init();