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
        this.bindaEvent();
    },
    //绑定事件
    bindaEvent: function () {
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
        //实时验证用户名
        $('#username').blur(function () {
            var username = $(this).val();
            if (!username) {
                return;
            }
            _user.checkUserName(username, function (res) {
                formErrorMsg.hide();
            }, function (err) {
                formErrorMsg.show(err);
            });
        });
        //输入框监听
        // $('input').not('#username').keyup(function () {
        //     if (!_currency.validate($(this).val(), 'require')) {
        //         formErrorMsg.show('不能为空');
        //     } else {
        //         formErrorMsg.hide();
        //     }
        // });
    },
    //提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password2').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        console.log(formData);
        //表单验证结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //验证成功
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
            }, function (err) {
                formErrorMsg.show(err);
            });
        }
        // 验证失败
        else {
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
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
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

};
$(function () {
    page.init();
});