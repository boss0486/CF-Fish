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
         // player
         lblName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         console.log(CurrentService.Login);
        if (CurrentService.Login != null) {
            this.lblName.string = CurrentService.Login.username;
        }
     },

    start () {

    },

    // update (dt) {},
});
