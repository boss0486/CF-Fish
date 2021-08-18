// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        SoundToggle: cc.Toggle,
        MusicToggle: cc.Toggle,
        SoundBackground: cc.Node,
        Soundcheckmark: cc.Node,
        MusicBackground: cc.Node,
        Musiccheckmark: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (isSoundOn) {
            this.SoundBackground.active = false;
            this.Soundcheckmark.active = true;
        } else {
            this.SoundBackground.active = true;
            this.Soundcheckmark.active = false;
        }

        if (isMusicOn) {
            this.MusicBackground.active = false;
            this.Musiccheckmark.active = true;
        } else {
            this.MusicBackground.active = true;
            this.Musiccheckmark.active = false;
        }
    },

    // update (dt) {},
});