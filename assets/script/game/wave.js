// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 
cc.Class({
    extends: cc.Component,

    properties: {
        _time: cc.Integer = 0,
        material: cc.Material
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
       
     },

    start() {
        cc.dynamicAtlasManager.enabled = false;
        this.material = this.node.getComponent(cc.Sprite).getMaterial(0);
        this.setResolution();
    },

    update(dt) {
        this._time += dt;
        this.material.setProperty("time", this._time);
    },
    setResolution() {
        this.material.setProperty("resolution", cc.v2(this.node.width, this.node.height));
    }
});
