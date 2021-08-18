// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CoinController from './coin_controller';
cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        numAtlas: cc.SpriteAtlas,
        tensPlace: cc.Sprite,
        onesPlace: cc.Sprite,
        coinController: CoinController,
        skCoinUp: cc.Skeleton

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        //this.ctl.testMain();
    },

    start() {

    },

    // update (dt) {},
    init(pos, num, ctr) {
        this.coinController = ctr;
        let str = num.toString();
        let nums = str.split('');

        // if (nums.length == 1) {
        //     this.onesPlace.node.active = false;
        //     this.tensPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[0]);
        // } else {
        //     this.onesPlace.node.active = true;
        //     this.tensPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[0]);
        //     this.onesPlace.spriteFrame = this.numAtlas.getSpriteFrame('goldnum_' + nums[1]);
        // }
        this.node.parent = cc.director.getScene();
        this.node.position = pos;
        let upState = this.anim.play('coin_up');
        upState.on('stop', this.despawn, this);
    },

    despawn() {
        this.coinController.despawnCoinup(this.node);
    }
});