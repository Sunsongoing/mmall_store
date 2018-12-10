'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _currency = require('util/currency.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function () {
        var _this = this;
        //通过事件冒泡来绑定点击事件
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    passwordOld: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val()),
                },
                //校验参数
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                delete userInfo.passwordConfirm;
                // 更改用户信息
                _user.updatePassWord(userInfo, function (res, msg) {
                    _currency.successToast(msg);
                    window.location.reload();
                }, function (err) {
                    _currency.errorToast(err);
                });
            } else {
                _currency.errorToast(validateResult.msg);
            }
        });
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_currency.validate(formData.passwordOld, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得少于六位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
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