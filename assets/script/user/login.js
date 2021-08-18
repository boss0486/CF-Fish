// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import CurrentService from "../helper/current";
import Notification from "../helper/notification";
import ValidData from "../helper/valid_data";
cc.Class({
    extends: cc.Component,

    properties: {
        editBoxAccount: cc.EditBox,
        editBoxPassword: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.lblVersion.string  = "V:0.0.0.1";

    },

    start() {

    },

    // update (dt) {},

    // #######################################################################################################
    onBntLoginClick: function() {
        if (this.editBoxAccount.string == "") {
            Notification.ShowMessage("Thông báo", "Nhập tài khoản");
            return;
        }
        //
        if (!ValidData.validLoginName(this.editBoxAccount.string)) {
            Notification.ShowMessage("Thông báo", "Tài khoản không hợp lệ");
            return;
        }
        //
        if (this.editBoxPassword.string == "") {
            Notification.ShowMessage("Thông báo", "Nhập mật khẩu");
            return;
        }
        //    
        CurrentService.SFxConnect.smartFox.loginOnAccount(this.editBoxAccount.string, this.editBoxPassword.string);
    }
});