'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _currency = require('util/currency.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        $('.panel-body').html(userHtml);
        //正式数据
        _user.getUserInfo(function (res) {
            userHtml = _currency.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (err) {
            _currency.errorToast(err);
        });
    }


}
$(function () {
    page.init();
});