'use strict';
var _currency = require('util/currency.js');
var _cities = require('util/cities/index.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    //显示弹窗
    show: function (option) {
        //绑定option
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    //关闭弹窗
    hide: function () {
        this.$modalWrap.empty();
    },
    // 绑定事件
    bindEvent: function () {
        var _this = this;
        //省份和城市二级联动
        _this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProcince = $(this).val();
            _this.loadCities(selectedProcince);
        });
        // 提交收货地址
        _this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
            //区分是添加还是编辑的变量
            isUpdate = _this.option.isUpdate;
            // 使用新地址，并且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function (res) {
                    _currency.successToast('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' &&
                        _this.option.onSuccess(res);
                }, function (err) {
                    _currency.errorToast(err);
                });
            }
            // 更新收件人地址，并且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function (res) {
                    _this.hide();
                    _currency.successToast('地址修改成功');
                    typeof _this.option.onSuccess === 'function' &&
                    _this.option.onSuccess(res);
                }, function (err) {
                    _currency.errorToast(err);
                });
            }
            // 验证不通过
            else {
                _currency.errorToast(receiverInfo.errMsg || '好像哪里不对了');
            }
        });
        //保证点击modal内容区的时候不关闭弹窗
        _this.$modalWrap.find('.modal-container').click(function (e) {
            //阻止事件冒泡
            e.stopPropagation();
        });
        //点击叉号或者蒙版区 关闭弹窗
        _this.$modalWrap.find('.close').click(function (e) {
            _this.hide();
        });
    },
    //加载模态框
    loadModal: function () {
        var addressModalHtml = _currency.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
    },
    //加载省份信息
    loadProvince: function () {
        var procinces = _cities.getProvinces() || [],
            data = this.option.data,
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(procinces));
        // 如果是更新地址，并且有省份信息，做省份的回填
        if (this.option.isUpdate && data.receiverProvince) {
            $provinceSelect.val(data.receiverProvince);
            this.loadCities(data.receiverProvince);
        }
    },
    //加载城市信息
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
        data = this.option.data,
        $citySelect = this.$modalWrap.find('#receiver-city');
        console.log(cities);
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址，并且有城市信息，做城市的回填
        if (this.option.isUpdate && data.receiverCity) {
            $citySelect.val(data.receiverCity);
        }
    },
    //获取表单里收件人信息的方法，并做表单的验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                errMsg: '',
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        //如果是更新拿到更新的地址的id
        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').data('id');
        }

        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        }
        //所有验证均通过
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    //获取select框的选项， 输入：arry，输出：html
    getSelectOption: function (optionArray) {
        console.log(optionArray)
        var html = '<option value="">请选择</option>';
        for (var index = 0, length = optionArray.length; index < length; index++) {
            html += '<option value="' + optionArray[index] + '">' + optionArray[index] + '</option>';
        }
        return html;
    }
};

module.exports = addressModal;