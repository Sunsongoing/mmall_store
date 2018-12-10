'use strict';
var _currency = require('util/currency.js');

var _user = {
    //登录
    login: function (userInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/login'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //注册
    register: function (userInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/register'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取用户密码提示问题
    getQuestion: function (user_name, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/forget_get_question'),
            data: {
                username: user_name
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //校验用户密码提示问题答案
    checkAnswer: function (param, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/forget_check_answer'),
            data: param,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新用户密码
    resetPassWord: function (param, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/forget_reset_password'),
            data: param,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查登录状态
    checkLogin: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/get_user_info'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户名是否存在
    checkUserName: function (username, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/check_valid'),
            method: 'POST',
            data: {
                str: username,
                type: 'username'
            },
            success: resolve,
            error: reject
        });
    },
    //获取用户信息
    getUserInfo: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/get_information'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/update_information'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新用户密码
    updatePassWord: function (userInfo, resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/reset_password'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //退出登录
    logout: function (resolve, reject) {
        _currency.request({
            url: _currency.getServerUrl('/user/logout'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
}

module.exports = _user;