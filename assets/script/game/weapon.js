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
        skeletons: [sp.SkeletonData],
        totalLevel: cc.Integer = 4,
        curLevel: cc.Integer = 1
    },
    init: function(totalLevel, curLevel) {
        this.curLevel = curLevel;
        this.totalLevel = totalLevel;
    },
    plus() {
        if (this.curLevel + 1 > this.totalLevel)
            this.curLevel = this.totalLevel;
        else
            this.curLevel++;
        // call service 
        CurrentService.SFxConnect.smartFox.gameBulletChangeRq(this.curLevel);
    },
    reduce() {
        if (this.curLevel < 2)
            this.curLevel = 1;
        else
            this.curLevel--;
        // call service 
        CurrentService.SFxConnect.smartFox.gameBulletChangeRq(this.curLevel);
    }
});