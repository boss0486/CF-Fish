// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//
import CurrentService from "../helper/current";
// 
import Player from "../player/player";
cc.Class({
    extends: cc.Component,

    properties: {
        id: cc.String = "",
        bullets: [cc.Prefab],
        angle: cc.Interger = 0, // angle of weapon
        bulletType: cc.String = "",
        player: Player, // current player
        attack: cc.Interger = 4,
        speed: cc.Interger = 10,
        speedBonus: cc.Interger = 1,
        bulletLevel: cc.Interger = 1,
        playerLocation: cc.Interger = 0,
        borderTotal: cc.Interger = 0,
        //  
        bongbongWrap: cc.Node,
        tween: cc.tween

    },
    onLoad() {
        this.speed = 1;
        this.speedBonus = 1;
    },

    start() {
        //
    },
    shot(_player, model) {
        this.player = _player;
        this.playerLocation = _player.playerLocation;
        this.player = _player;
        var _weaponPos = _player.weapon.node.parent.convertToWorldSpaceAR(_player.weapon.node.getPosition());
        //   
        if (_glbGameSkill.tagetTo != null) {

            if (cc.director.getScene().getChildByName('bongbongWrap') == null) {
                this.bongbongWrap = new cc.Node('bongbongWrap');
            } else {
                this.bongbongWrap = cc.director.getScene().getChildByName('bongbongWrap');
            }
            // 
            this.bongbongWrap.zIndex = 2;
            this.bongbongWrap.angle = _player.weapon.node.angle;;
            this.bongbongWrap.position = _weaponPos;
            this.bongbongWrap.width = 50;
            this.bongbongWrap.height = 2000;
            this.bongbongWrap.anchorX = 0;
            this.bongbongWrap.anchorY = 1;

            this.bongbongWrap.parent = cc.director.getScene();
            this.node.parent = this.bongbongWrap;

            this.speedBonus = 0.5;
            this.moveTageLogic();

        } else {

            this.bongbongWrap = null;
            this.node.parent = cc.director.getScene();
            this.node.zIndex = 3;
            // 
            this.node.position = _weaponPos;
            this.angle = -_player.weapon.node.angle;
            this.node.angle = -this.angle;
            console.log(this.node.angle);
            //
            let bpos = cc.v2(_weaponPos.x + 120 * Math.sin(this.angle / 180 * Math.PI), _weaponPos.y + 120 * Math.cos(this.angle / 180 * Math.PI));
            if (this.playerLocation == 3 || this.playerLocation == 4) {
                this.node.angle = -(this.angle - 180);
                bpos = cc.v2(_weaponPos.x - 120 * Math.sin(this.angle / 180 * Math.PI), _weaponPos.y - 120 * Math.cos(this.angle / 180 * Math.PI));
            }
            //
            this.node.position = bpos;
            this.speedBonus = 1;
            this.moveLogic();
            //
            // this.callBack = function () {
            //     this.moveLogic(0.05);
            // };
            // this.schedule(this.callBack, 0.02, cc.macro.REPEAT_FOREVER);
        }
    },
    // 根据武器等级设置子弹等级
    setBullet(model) {
        this.bulletLevel = model.bulletLevel;
        this.bulletType = model.bulletType;
        this.bulletId = model.bulletId;
        this.id = model.bulletId;
    },
    moveLogic() {
        let bpos = cc.v2(this.node.x + 2000 * Math.sin(this.angle / 180 * Math.PI), this.node.y + 2000 * Math.cos(this.angle / 180 * Math.PI));
        if (this.playerLocation == 3 || this.playerLocation == 4) {
            bpos = cc.v2(this.node.x - 2000 * Math.sin(this.angle / 180 * Math.PI), this.node.y - 2000 * Math.cos(this.angle / 180 * Math.PI));
        }
        cc.tween(this.node).to(this.speed * this.speedBonus, { position: bpos }).start();
    },
    moveTageLogic() {
        var degree = this.node.angle / 180 * Math.PI;
        let bpos = cc.v2(this.node.x + 2000 * Math.sin(degree), this.node.y + 2000 * Math.cos(degree));
        if (this.playerLocation == 3 || this.playerLocation == 4)
            bpos = cc.v2(this.node.x - 2000 * Math.sin(degree), this.node.y - 2000 * Math.cos(degree));
        //
        cc.tween(this.node).to(this.speed * this.speedBonus, { position: bpos }).start();
        // 
    },
    onCollisionEnter(other, self) {
        let otherNode = other.node;
        switch (otherNode.name) {
            case "screenLeft":
                self.node.angle += -2 * self.node.angle;
                console.log(`L:::: ${self.node.angle}`);
                if (_glbGameSkill.tagetTo != null) {
                    self.node.angle = 180;
                }
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenTop":
                self.node.angle += 180 - 2 * self.node.angle;
                console.log(`T:::: ${self.node.angle}`);
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenButton":
                self.node.angle += 180 - 2 * self.node.angle;
                console.log(`B:::: ${self.node.angle}`);
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenRight":
                console.log(`R:::: ${self.node.angle}`);
                self.node.angle += -2 * self.node.angle;
                if (_glbGameSkill.tagetTo != null) {
                    self.node.angle = 180;
                }
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            default:
                break;
        }
        //  
        let fish = other.node.getComponent("fish");
        console.log(fish);
        if (fish == null)
            return;
        //
        let posb = self.world.points;
        let posNet = posb[0].add(posb[3]).mul(0.5);
        // 矩形碰撞组件顶点坐标，左上，左下，右下，右上
        if (_glbGameSkill.tagetTo != null) {
            if (fish.id == _glbGameSkill.tagetTo.id) {
                this.player.castNet(posNet);
                self.node.destroy();
                //this.player.despawnBullet(this.node);
                // CurrentService.SFxConnect.smartFox.gameAttackEnemy({
                //     enemyId: fish.id,
                //     bulletType: this.bulletType,
                //     bulletId: this.bulletId
                // });
            }

        } else {
            this.player.castNet(posNet);
            self.node.destroy();
            //this.player.despawnBullet(this.node);
            // CurrentService.SFxConnect.smartFox.gameAttackEnemy({
            //     enemyId: fish.id,
            //     bulletType: this.bulletType,
            //     bulletId: this.bulletId
            // });
        }

    },
    // update(dt) {

    // }
});