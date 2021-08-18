// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audio: cc.AudioClip,
        audioId: cc.Integer,
    },
    play: function() {
        cc.audioEngine.stopAll();
        this.audioId = cc.audioEngine.play(this.audio, true, 0.5);
        console.log(this);
    },
    pause: function() {
        cc.audioEngine.pause(this.audioId);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function() {
        var _this = this;
        cc.resources.load("/Sound/vo-lam", cc.AudioClip, null, function(err, clip) {
            _this.audio = clip;
        });
    },

    onDestroy: function() {
        cc.audioEngine.stop(this.audioId);
    },
    start() {

    },

    // update (dt) {},
});