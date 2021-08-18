// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lblTitle: cc.RichText,
        lblDate: cc.Label,
        lblContent: cc.RichText,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    // update (dt) {},
});