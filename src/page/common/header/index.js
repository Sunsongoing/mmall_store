'use strict';
require('./index.css');
var _currency = require('util/currency.js');

//通用页面头部
var header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        var keyword = _currency.getUrlParam('keyword');
        //如果keyword存在则回填
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //回车提交
        $('#search-input').keyup(function (e) {
            if (e.keyCode == 13) {
                _this.searchSubmit();
            }
        });

    },
    // 提交搜索
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        //keyword正常跳转list页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 否则跳转到主页
        else {
            _currency.goHome();
        }
    }
}
module.exports = header.init();