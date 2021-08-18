// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CurrentService from "../helper/current";
import NotificationService from "../helper/notification";
cc.Class({
    extends: cc.Component,

    properties: {
        loginModal: cc.Node,
        //
        helpModal: cc.Node,
        eventModal: cc.Node,
        giftCodeModal: cc.Node,
        storeModal: cc.Node,
        chatModal: cc.Node,
        mailBoxModal: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    },

    start() {

    },
    // update (dt) {},
    onPlay() {
        //cc.director.loadScene("Game");
    },
    onQuickLogin() {

        // smartFox.loginOnQuickLogin();
    },

    onHelpButtonClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.helpModal.active = true;
    },
    onEventButtonClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.eventModal.active = true;
    },
    onStoreButtonClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.storeModal.active = true;
    },
    onGiftCodeButtonClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.giftCodeModal.active = true;
    },
    onChatButtonClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.chatModal.active = true;
    },
    onMailBoxClick: function() {
        if (!CurrentService.LoginState)
            return NotificationService.ShowMessage("", "Yêu cầu đăng nhập");
        //
        this.mailBoxModal.active = true;
    }
});