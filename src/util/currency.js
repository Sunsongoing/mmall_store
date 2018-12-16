'use strict';

var Hogan = require('hogan.js');

//配置
var conf = {
    serverHost: 'mmall',
}

var _currency = {
    request: function (param) {
        var _that = this;
        $.ajax({
            type: param.method || 'post',
            url: param.url || '',
            dataType: param.dataType || 'json',
            data: param.data || '',
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' &&
                        param.success(res.data, res.msg);
                }
                //没有登录
                else if (10 === res.status) {
                    _that.doLogin();
                }
                //请求错误
                else if (1 === res.status) {
                    typeof param.success === 'function' &&
                        param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' &&
                    param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    /*
     *获取url参数
     *name : 参数名称
     */
    getUrlParam: function (name) {
        //使用正则匹配参数名称
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //search是一个可查询的属性，可以查询 ? 之后的部分
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    /*
     *使用hogan渲染html模板
     *htmlTemplate : html 模板
     *data ： 数据
     */
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        return template.render(data);
    },
    //成功提示
    successToast: function (msg) {
        alert(msg || '成功');
    },
    //失败提示
    errorToast: function (msg) {
        alert(msg || '失败');
    },
    //验证
    validate: function (value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            //强转为boolean
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }

    },
    //跳转登录
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳转首页
    goHome: function () {
        window.location.href = './index.html';
    },

}
module.exports = _currency;