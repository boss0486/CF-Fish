// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import LibFormat from "../helper/lib_format";
import CurrentService from "../helper/current";
cc.Class({
    extends: cc.Component,

    properties: {
        lblName: cc.Label,
        lblVip: cc.Label,
        lblCoin: cc.Label,
        lblGem: cc.Label,
        avatar: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        if (CurrentService.Login != null) {
            var _this = this;
            this.lblName.string = CurrentService.Login.displayname;
            this.lblVip.string = `VIP ${CurrentService.Login.vip}`;
            this.lblGem.string = LibFormat.formatToCurrency(CurrentService.Login.gem);
            cc.resources.load(`fish/avatar/${CurrentService.Login.avatar}`, cc.SpriteFrame, (err, asset) => {
                _this.avatar.getComponent(cc.Sprite).spriteFrame = asset;
            });
        }
    },

    start() {

    },

    // update (dt) {},
});