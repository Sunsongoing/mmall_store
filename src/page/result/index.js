'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _currency = require('util/currency.js');
$(function () {
    var type = _currency.getUrlParam('type') || 'default';
    var $element = $('.' + type + '-success');
    if (type === 'payment' || type === 'order-closed') {
        var orderNumber = _currency.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    } 
    
    //显示对应提示元素
    $element.show();

});
