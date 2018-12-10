'use strict';
require('./index.css');
var _currency = require('util/currency.js');
var templatePagination = require('./index.string');

var Pagination = function () {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3, //左右浮动范围
        onSelectPage: null,
    }
    // 事件的处理
    $(document).on('click', '.pg-item', function () {
        var $this = $(this);
        // 已经是点击状态，或者是不可点击状态直接返回
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            _this.option.onSelectPage($this.data('value')) : null;
    });
}
//渲染组件
Pagination.prototype.render = function (userOption) {
    // 合并option
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断是否是jquery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断是否只有一页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html. |上一页| 1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function () {
    var html = '',
        _option = this.option,
        pageArray = [],
        start = _option.pageNum - _option.pageRange > 0 ?
        _option.pageNum - _option.pageRange : 1,
        end = _option.pageNum + _option.pageRange < _option.pages ?
        _option.pageNum + _option.pageRange : _option.pages;

    // 上一页
    pageArray.push({
        name: '上一页',
        value: _option.prePage,
        disabled: !_option.hasPreviousPage
    });
    // 数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === _option.pageNum)
        });
    }
    // 下一页
    pageArray.push({
        name: '下一页',
        value: _option.nextPage,
        disabled: !_option.hasNextPage
    });
    html = _currency.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: _option.pageNum,
        pages: _option.pages
    });
    return html;
}
module.exports = Pagination;