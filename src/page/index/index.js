'use strict';
require('./index.css');
require('util/slider/index.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var templateBanner = require('./index.string');
var _currency = require('util/currency.js');
var page = {
    init: function () {
        //渲染banner的html
        var bannerHtml = _currency.renderHtml(templateBanner);
        $('.banner-con').html(bannerHtml);
        //初始化banner
        var $unslider = $('.banner').unslider({
            speed: 500, //  动画时间
            delay: 3000, //  滚动间隔
            complete: function () {}, //  每张图片切换动画完成后的回调
            keys: true, //  键盘左右键切换上一张下一张
            dots: true, //  引导点
            fluid: false //  支持响应式设计
        });
        //前一张后一张操作的事件绑定
        $('.banner-con .banner-arrow').click(function () {
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $unslider.data('unslider')[forward]();
        });
    },
};

$(function () {
    page.init();
});