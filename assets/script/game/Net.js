// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Player from "../player/player";



cc.Class({
    extends: cc.Component,
    properties: {
        player: Player,
        curLevel: cc.Interger = 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },
    // update (dt) {},
    init: function(position, _player, level) {
        this.player = _player;
        this.curLevel = level;
        this.node.parent = cc.director.getScene();
        this.node.position = position;
        //
        var skeleton = this.node.getComponent(sp.Skeleton);
        skeleton.addAnimation(0, "impact3", false, 0.1);
        skeleton.addAnimation(0, "impact2", false, 0);
    },
    //
    despawnNet: function() {
        this.game.despawnNet(this.node);
    }
});