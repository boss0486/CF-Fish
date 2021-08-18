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

        //isSoundOn: cc.Boolean,
        //isMusicOn: cc.Boolean,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //var screenSize = cc.EGLView.getInstance().getFrameSize();
        //screenSize.setDesignResolutionSize(screenSize.width, screenSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);

        isSoundOn = cc.sys.localStorage.getItem("isSoundOn");
        if (isSoundOn === null) {
            isSoundOn = false;
        }
        isMusicOn = cc.sys.localStorage.getItem("isMusicOn");
        if (isMusicOn === null) {
            isMusicOn = false;
        }

        console.log(isMusicOn);
    },

    // update (dt) {},
});
