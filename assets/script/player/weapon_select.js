// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CurrentService from "../helper/current";
cc.Class({
    extends: cc.Component,

    properties: {

        gunType: cc.Integer
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        // event 
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            CurrentService.SFxConnect.smartFox.gameWeaponChangeRq(_this.gunType);
        });
    },

    start() {

    },

    // update (dt) {},
});