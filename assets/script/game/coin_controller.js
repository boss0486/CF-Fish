// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//
import LibFormat from "../helper/lib_format";
import CurrentService from "../helper/current";
//
cc.Class({
    extends: cc.Component,

    properties: {
        // hiệu ứng + coin
        coinPlusPrefab: cc.Prefab,
        // hiệu ứng coin bay vào giỏ
        coinsPrefab: cc.Prefab,
        //
        coinUpPool: cc.NodePool,
        coinsPool: cc.NodePool,
        // +金币数字
        coin_up: cc.Node,
        // 获得金币
        oneCoin: cc.Node,
        //
        anim: cc.Animation,
        currentValue: cc.Integer,
        timerAtlas: cc.SpriteAtlas,
        //
        lblName: cc.Label,
        lblCoin: cc.Label,
    },
    onLoad() {
        // call api

        //this.lblCoin.string = LibFormat.ZeroPadCoin(this.currentValue);
        //
        this.coinUpPool = new cc.NodePool();
        this.coinsPool = new cc.NodePool();
        //
        //this.anim.play('gold_down');
    },
    start() {

    },
    init() {
        this.setValue(this.currentValue);
    },
    setValue(value) {
        this.lblCoin.string = LibFormat.ZeroPadCoin(value);
    },
    // 获取金币加数
    // addCoins(value) {
    //     this.currentValue += value;
    //     this.setValue(this.currentValue);
    // },
    // // 发射子弹消耗金币
    // reduceCoin(level) {
    //     // level 1 <=> 1 coin 
    //     if (this.currentValue >= level) {
    //         this.setValue(this.currentValue -= level);
    //         return true;
    //     }
    //     return false;
    // },
    gainCoins(_fishPos, _coinLocation, _coinnum, _total) {
        // 上升的数字对象池
        if (this.coinUpPool.size() > 0) {
            this.coin_up = this.coinUpPool.get();
        } else {
            this.coin_up = cc.instantiate(this.coinPlusPrefab);
        }
        this.coin_up.getComponent("coin_up").init(_fishPos, _coinnum, this);

        // 金币对象池
        if (this.coinsPool.size() > 0) {
            this.oneCoin = this.coinsPool.get();
        } else {
            this.oneCoin = cc.instantiate(this.coinsPrefab);
        }
        this.oneCoin.getComponent("coins").init(this);
        // 转为世界坐标 hieu ung coin bay ve tui
        let toPos = this.node.convertToWorldSpaceAR(_coinLocation);
        this.oneCoin.getComponent("coins").goDown(_fishPos, toPos);
        this.setValue(_total);
    },
    despawnCoins(coin) {
        this.coinsPool.put(coin);
    },

    despawnCoinup(nup) {
        this.coinUpPool.put(nup);
    },
    test01() {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    },

    // update (dt) {},
});