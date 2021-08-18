// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audioGame: cc.AudioSource,
        soundGame: cc.AudioSource,
        soundWeapon: cc.AudioSource,
        soundUpgrade: cc.AudioSource
    },
    play: function () {
        this.audioGame.play();
    },
    pause: function () {
        this.audioGame.pause();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function () {
        this.play();
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    start() {

    },

    // update (dt) {},
});
