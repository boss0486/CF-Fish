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
        cointroller: CoinController,
        coinList: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {

    },

    // update (dt) {},
    init(ctr) {
        this.cointroller = ctr;
    },
    goDown(pos, toPos) {
        this.node.parent = cc.director.getScene()
        this.node.position = pos;
        this.coinList.forEach(element => {
            var _this = this;
            cc.tween(element).to(0.5, { position: cc.v2(toPos) })
                .call(() => {
                    _this.despawnCoin();
                }).start();
        });


        //
    },
    despawnCoin() {
        this.cointroller.despawnCoins(this.node);
    }
});