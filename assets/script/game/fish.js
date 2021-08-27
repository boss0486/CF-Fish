// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FishEmun from './fish_enum';
import Game from "./game";

import CurrentService from "../helper/current";

require("runtime");

var _FishEmun = new FishEmun();
var drawLine = null;
//
cc.Class({
    extends: cc.Component,
    properties: {
        id: cc.String = "",
        speed: cc.Double = 80,
        speedBonus: cc.Double = 0,
        //
        lastPosition: cc.v2,
        game: Game,
        bezierArray: [],
        cntBezier: cc.Interger = 0,
        //
        lblName: cc.Label,
        taget: cc.Node,
        fooTween: false,
        //
        nextArray: null,
    },
    onLoad() {

    },

    start() {
        // var win = cc.winSize;
        // var percentx = win.width / 1384;
        // var percenty = win.height / 784;
        //this.node.setScale(percentx, percenty);
        // this.node.parent = cc.find('Canvas');
    },
    // 重新设置碰撞区域
    changeCollider: function() {
        let collider = this.node.getComponent(cc.PolygonCollider);
        collider.size = this.node.getContentSize();
    },
    // 小鱼游泳，贝塞尔曲线实现

    // LIFE-CYCLE CALLBACKS:
    init: function(_map, _game) {
        this.node.parent = cc.find('Canvas');
        this.drawLine = _game.drawLine;
        this.game = _game;
        //
        var arr = _map.path;
        this.bezierArray = _map.path;
        this.speed = _map.speed;
        this.speedBonus = _map.speedbonus;
        this.cntBezier = 0;
        var bz1 = this.node.parent.convertToNodeSpaceAR(cc.v2(arr[this.cntBezier].x, arr[this.cntBezier].y));
        this.node.position = bz1;
        //
        this.id = _map.id;
        this.node.name = _map.id;
        this.lblName.string = ``;
        //
        this.lastPosition = this.node.getPosition();
        this.node.zIndex = 2;
        this.spawnFish();
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            if (_glbGameSkill.tagetState && _glbGameSkill.tagetTo == null) {
                //_this.lblName.string = `右上 >:<`;
                _glbGameSkill.tagetTo = _this;
                _this.taget.active = true;
                _this.game.autoShootOnTaget(_this.id);
            }
        }, this.node);
    },
    spawnFish: function() {
        this.lastPosition = this.node.getPosition();
        this.changeCollider();
        this.swimming();
        //##########################################################################################################################
    },
    swimming: function() {
        var arr = this.bezierArray;
        var _this = this;
        var bz1 = cc.find('Canvas').convertToNodeSpaceAR(cc.v2(arr[this.cntBezier].x, arr[this.cntBezier].y));
        var distance = 0;
        if (this.cntBezier > 0)
            distance = Math.sqrt(
                (arr[this.cntBezier - 1].x - arr[this.cntBezier].x) * (arr[this.cntBezier - 1].x - arr[this.cntBezier].x) +
                (arr[this.cntBezier - 1].y - arr[this.cntBezier].y) * (arr[this.cntBezier - 1].y - arr[this.cntBezier].y));
        // 
        var _fspeed = distance / _this.speed;
        this.fooTween = cc.tween(_this.node)
            .to(_fspeed / 3, { position: bz1 })
            .call(() => {
                if (CurrentService.GameSkill.freezeState == false) {
                    _this.cntBezier++;
                }
                if (_this.cntBezier < arr.length) {
                    if (!CurrentService.GameSkill.freezeState)
                        _this.updateDegree();
                    //
                    _this.swimming();
                }
                //
                if (_this.cntBezier == this.bezierArray.length) {
                    if (_glbGameSkill.tagetTo != null && _this.id == _glbGameSkill.tagetTo.id) {
                        this.taget.active = false;
                        _this.destroySkillTaget();
                    }
                    CurrentService.SFxConnect.smartFox.gameRemoveEnemy(this.id);
                    this.node.destroy();
                }
            }).start();
        //  
    },
    updateDegree: function() {
        let currentPos = this.node.getPosition();
        // 如果位移不超过1，不改变角度
        if (this.lastPosition.sub(currentPos).mag() < 1) {
            return;
        }
        let dir = currentPos.sub(this.lastPosition);
        // 求角度
        if (dir.x == 0 && dir.y == 0) {
            dir.x = 1;
            dir.y = 1;
        }
        let angle = cc.v2(dir).signAngle(cc.v2(1, 0));
        // 转为欧拉角
        let degree = angle / Math.PI * 180;
        this.node.angle = -degree;
        this.lastPosition = currentPos;
        // 
    },
    fishDie: function(_player, model) {
        //
        this.node.stopAllActions();
        // 播放金币动画
        let fishPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        console.log("tra cho:" + _player.name);
        _player.getComponent("player").gainCoins(fishPos, model.earn);
        // huy skill taget
        //this.destroySkillTaget();
        //this.node.destroy();
    },
    destroySkillTaget() {
        _glbGameSkill.tagetState = false;
        _glbGameSkill.tagetTo = null;
    },
    func_Loaction(bezierArray) {
        // bezierArray = [
        //     cc.v2(3, 3),
        //     cc.v2(37, 301),
        //     //1
        //     cc.v2(129, 177),
        //     cc.v2(227, 2),
        //     //2
        //     cc.v2(347, 87),
        //     cc.v2(361, 303)
        //     //3
        //     // cc.v2(600, 50),
        //     // cc.v2(700, 100),
        //     // //4
        //     // cc.v2(800, 200),
        //     // cc.v2(900, 50),
        //     // //5
        //     // cc.v2(1000, 100),
        //     // cc.v2(1100, -100)
        // ];
        var arrResult = [];
        var i, j, chunk = 3;
        for (i = 0, j = bezierArray.length; i < j; i += chunk) {
            if (i > 0) {
                arrResult.push(bezierArray.slice(i - 1, i - 1 + chunk));
                i = i - 1;
            } else {
                arrResult.push(bezierArray.slice(i, i + chunk));
            }
        }
        // 
        return arrResult;
    }
});