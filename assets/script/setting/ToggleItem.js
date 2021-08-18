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

        background: cc.Sprite,
        checkMark: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onLoad() {
        let check = new cc.Component.EventHandler(); // 创建一个新的事件处理
        check.target = this.node; // 绑定回调方法所在的节点
        check.component = "ToggleItem"; // 绑定回调方法所在的脚本名字
        check.handler = "OnValueChanged"; // 绑定的回调方法的名字
        check.customEventData = "Changed"; // 绑定的回调方法的参数

        let toggle = this.node.getComponent(cc.Toggle);
        if (toggle) {
            toggle.checkEvents = []; // 清空toggle的回调事件列表
            toggle.checkEvents.push(check); // 将方法绑定到指定toggle
        }
    },

    OnValueChanged: function(toggle, customEventData) {
        console.log(toggle.isChecked);
        console.log("toggle.isChecked");
        //if (toggle.isChecked) console.log(customEventData);

        if (customEventData === "SoundToggle") {


            isSoundOn = toggle.isChecked;

            cc.sys.localStorage.setItem("isSoundOn", isSoundOn);
        }

        if (customEventData === "MusicToggle") {

            isMusicOn = toggle.isChecked;

            cc.sys.localStorage.setItem("isMusicOn", isMusicOn);
        }

        if (this.background) {
            this.background.node.active = !!!toggle.isChecked;
        }
    },

    // update (dt) {},
});