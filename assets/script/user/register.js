// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CurrentService from "../helper/current";
import Notification from "../helper/notification";
//import SmartFoxService from "../network/SmartFoxService";
import ValidData from "../helper/valid_data";
//var smartFox = new SmartFoxService();
//var helperValid = new ValidData();


cc.Class({
    extends: cc.Component,

    properties: {
        displayname: cc.EditBox,
        account: cc.EditBox,
        password: cc.EditBox,
        rePassword: cc.EditBox,
        // email: cc.Label,
        // mobile: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.lblVersion.string  = "V:0.0.0.1";

    },

    start() {

    },

    // update (dt) {},

    // #######################################################################################################
    onBntRegisterClick: function() {
        var model = {
            displayname: this.displayname.string,
            account: this.account.string,
            password: this.password.string,
            rePassword: this.rePassword.string,
            // email: this.email.string,
            // mobile: this.mobile.string
        };
        // 
        if (this.account.string == "") {
            Notification.ShowMessage("Thông báo", "Nhập tài khoản");
            return;
        }
        if (model.account.length < 5 || model.account.length > 18) {
            Notification.ShowMessage("Thông báo", "Tài khoản giới hạn [5-18] ký tự");
            return;
        }
        if (!ValidData.validLoginName(model.account)) {
            Notification.ShowMessage("Thông báo", "Tài khoản không hợp lệ");
            return;
        }
        if (model.password == "") {
            Notification.ShowMessage("Thông báo", "Nhập mật khẩu");
            return;
        }
        if (model.rePassword == "") {
            Notification.ShowMessage("Thông báo", "Xác nhận mật khẩu");
            return;
        }
        if (model.password != model.rePassword) {
            Notification.ShowMessage("Thông báo", "Xác nhận mật khẩu chưa đúng");
            return;
        }
        if (model.displayname == "") {
            Notification.ShowMessage("Thông báo", "Nhập tên hiển thị");
            return;
        }
        if (model.displayname.length < 5 || model.displayname.length > 18) {
            Notification.ShowMessage("Thông báo", "Tên hiển thị giới hạn [5-18] ký tự");
            return;
        }
        if (!ValidData.validName(model.displayname)) {
            Notification.ShowMessage("Thông báo", "Tên hiển thị không hợp lệ");
            return;
        }
        //  
        CurrentService.SFxConnect.smartFox.registerOnAccount(model);
    }
});