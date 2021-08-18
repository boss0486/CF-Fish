// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CurrentService from "../helper/current";
//
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
    onbtnFreezeClick: function() {
        //bonus ["ticket", "freeze", "speed", "follow"]
        if (!CurrentService.GameSkill.freezeState) {
            CurrentService.SFxConnect.smartFox.gameAttackSkill({
                skillType: 2
            });
        }
    },
    onbtnTagetClick: function() {
        if (CurrentService.GameSkill.tagetTo == null) {
            CurrentService.SFxConnect.smartFox.gameAttackSkill({
                skillType: 4
            });
        }
    }
});