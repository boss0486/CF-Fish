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
        this.node.angle = 0;
        var trackNode = cc.find("Canvas/trackNode");
        trackNode.addChild(this.node, 1, this.id);
        this.speedBonus = 0.5;
        this.moveTageLogic();
        return;
        //   
        if (_glbGameSkill.tagetTo != null) {
            this.node.angle = 0;
            var trackNode = cc.find("Canvas/trackNode");
            trackNode.addChild(this.node, 1, this.id);
            this.speedBonus = 0.5;
            this.moveTageLogic();
            //
            // var followMe = this;
            // var target = cc.v2(500, 500);
            // // set speed somewhere
            // var speed = 100.0;
            // // calculate the difference between the positions of followMe and the target
            // var difference = target - followMe.node.position;
            // // calculate the ratio of movement along X and Y to maintain a constant speed, multiply
            // // by the speed, and use delta time to keep speed the same if the frame rate changes
            // var change = difference.getNormalized() * speed * 0.0001;

            // // if the target is further away than followMe will move, just move it. Otherwise, just set the position
            // // to the target to avoid followMe endlessly moving past the target.
            // if (difference.length() > change.length()) {
            //     followMe.setPosition(followMe.numbergetPosition() + change);
            // } else {
            //     followMe.numbersetPosition(target);
            // }

            //this.node.parent = cc.director.getScene();
        } else {
            this.node.parent = cc.director.getScene();
            this.node.zIndex = 3;
            //
            this.player = _player;
            this.playerLocation = _player.playerLocation;
            let _weaponPos = _player.weapon.node.parent.convertToWorldSpaceAR(_player.weapon.node.getPosition());
            this.node.position = _weaponPos;
            this.angle = -_player.weapon.node.angle;
            this.node.angle = -this.angle;
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
        if (this.playerLocation == 3 || this.playerLocation == 4)
            bpos = cc.v2(this.node.x - 2000 * Math.sin(this.angle / 180 * Math.PI), this.node.y - 2000 * Math.cos(this.angle / 180 * Math.PI));
        //
        cc.tween(this.node).to(this.speed * this.speedBonus, { position: bpos }).start();
    },
    moveTageLogic() {
        var degree = parseInt(this.angle / 180 * Math.PI);
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
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenTop":
                self.node.angle += 180 - 2 * self.node.angle;
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenButton":
                self.node.angle += 180 - 2 * self.node.angle;
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            case "screenRight":
                console.log("cham right");
                self.node.angle += -2 * self.node.angle;
                var bpos = cc.v2(self.node.x + 2000 * Math.sin(-self.node.angle / 180 * Math.PI), self.node.y + 2000 * Math.cos(-self.node.angle / 180 * Math.PI));
                cc.tween(self.node).to(this.speed * this.speedBonus, { position: cc.v2(bpos.x, bpos.y) }).start();
                break;
            default:
                console.log("Chạm cá");
                let fish = other.node.getComponent("fish");
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
                break;
        }
    },
    // update(dt) {

    // }
});