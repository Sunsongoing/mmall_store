'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUserName();
    },
    bindEvent: function () {
        var _this = this;
        //输入用户名按钮点击事件
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (err) {
                    formErrorMsg.show(err);
                });
            } else {
                formErrorMsg.show('请输入用户名');
            }
        });
        //输入密码提示问题答案按钮点击事件
        $('#submit-answer').click(function () {
            var answers = $.trim($('#answer').val());
            if (answer) {
                var param = {
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answers
                };
                _user.checkAnswer(param, function (res) {
                    _this.data.answer = answers;
                    _this.data.token = res;
                    _this.loadStepPassWord();
                }, function (err) {
                    formErrorMsg.show(err);
                });
            } else {
                formErrorMsg.show('请输入密码提示答案');
            }
        });
        //输入新密码按钮点击事件
        $('#submit-password').click(function () {
            var newPass = $.trim($('#newPass').val());
            if (newPass && newPass.length >= 6) {
                var param = {
                    username: _this.data.username,
                    passwordNew: newPass,
                    forgetToken: _this.data.token
                };
                _user.resetPassWord(param, function (res) {
                    window.location.href='./result.html?type=pass-reset';
                }, function (err) {
                    formErrorMsg.show(err);
                });
            } else {
                formErrorMsg.show('请输入不少于6位的新密码');
            }
        });
    },
    // 加载输入用户名
    loadStepUserName: function () {
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案
    loadStepQuestion: function () {
        formErrorMsg.hide();
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').html(this.data.question);
    },
    // 加载输入新密码
    loadStepPassWord: function () {
        formErrorMsg.hide();
        $('.step-question').hide().siblings('.step-password').show();
    },

};

$(function () {
    page.init();
});