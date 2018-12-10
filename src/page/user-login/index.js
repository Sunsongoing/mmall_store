'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _currency = require('util/currency.js');
var _user = require('service/user-service.js');

//表单错误提示
var formErrorMsg = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('');
    },

}

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //登录按钮点击事件
        $('#submit').click(function () {
            _this.submit();
        });
        //回车提交
        $('.user-content').keyup(function (event) {
            if (event.keyCode === 13) {
                _this.submit();
            }
        });
        // //输入框监听
        // $('#username').keyup(function () {
        //     if (!_currency.validate($(this).val(), 'require')) {
        //         formErrorMsg.show('用户名不能为空');
        //     } else {
        //         formErrorMsg.hide();
        //     }
        // });
        // $('#password').keyup(function () {
        //     if (!_currency.validate($(this).val(), 'require')) {
        //         formErrorMsg.show('密码不能为空');
        //     } else {
        //         formErrorMsg.hide();
        //     }
        // });
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //验证成功
            _user.login(formData, function (res) {
                window.location.href = _currency.getUrlParam('redirect') ||
                    './index.html';
            }, function (err) {
                formErrorMsg.show(err);
            });
        } else {
            //验证失败
            formErrorMsg.show(validateResult.msg);
        }
    },
    //登录表单验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_currency.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_currency.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});