// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import LibFormat from "../helper/lib_format";
import CurrentService from "../helper/current";
import NotificationService from "../helper/notification";
import HelperService from "../helper/help_service";
// ****************************************************************
cc.Class({
    extends: cc.Component,
    properties: {
        loginModal: cc.Node,
        unLoginModal: cc.Node,
        //
        profileModal: cc.Node,
        playerLogin: cc.Node,
        storeModal: cc.Node,
        mailModal: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // global for service
        _glbMenu = this;
        _scence = "viet_menu";
        HelperService.autoFixScreen();
        // ******************************************* 
        if (CurrentService.LoginState) {
            if (CurrentService.Login == null)
                return;
            //
            this.loginModal.active = true;
            this.unLoginModal.active = false;

        } else {
            this.loginModal.active = false;
            this.unLoginModal.active = true;
        }
    },
    start() {

    },
    playerLoad: function() {
        this.playerLogin.getComponent("player_login").onLoad();
    },
    profileLoad: function() {
        this.profileModal.getComponent("profile_modal").onLoad();
    },
    storeLoad: function(data) {
        this.storeModal.getComponent("store_modal").storeLoad(data);
    },
    mailLoad: function(data) {
        this.mailModal.getComponent("mail_modal").mailLoad(data);
    },
    notificationLoad() {
        console.log("ok");
    }
});