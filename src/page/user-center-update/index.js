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
    data: {
        username: ""
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        //通过事件冒泡来绑定点击事件
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    username: _this.data.username,
                    phone: $.trim($('#phone').val()),
                    email: $.trim($('#email').val()),
                    question: $.trim($('#question').val()),
                    answer: $.trim($('#answer').val())
                },
                //校验参数
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户信息
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _currency.successToast(msg);
                    window.location.href = './user-center.html';
                }, function (err) {
                    _currency.errorToast(err);
                });
            } else {
                _currency.errorToast(validateResult.msg);
            }
        });
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '',
            _this = this;
        _user.getUserInfo(function (res) {
            _this.data.username = res.username;
            userHtml = _currency.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (err) {
            _currency.errorToast(err);
        });
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_currency.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_currency.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_currency.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_currency.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_currency.validate(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }



}
$(function () {
    page.init();
});