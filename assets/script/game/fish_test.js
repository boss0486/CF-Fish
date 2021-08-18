// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
         fish: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        //this.node.rotation = 90;
        //this.node.setRotation(180);
        //this.node.angle = 180;
        //this.node.position(-620,31.78);
     },

    start () {

    },

    // update (dt) {},
});
