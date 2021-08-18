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

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    },

    start() {

    },
    // update (dt) {},
    onPlay() {
        // loading game
        cc.director.loadScene("Game");
    },
    onQuickLogin() {
        CurrentService.SFxConnect.smartFox.loginOnQuickLogin("", "");
        console.log("ok1");
    },
});