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
        screenWidth: number = 0,
        screenHeight: number = 0,
        limitX: number = 0,
        limitY: number = 0,
        defSpeed: number = 0,
        speedX: number = 0,
        speedY: number = 0,
        callBack: any = null,
        bongbongWrap: cc.Node

    },
    onLoad() {
        this.speed = 500;
        this.speedBonus = 1;
    },

    start() {
        this.screenWidth = Math.floor(cc.winSize.width);
        this.screenHeight = Math.floor(cc.winSize.height);
        this.limitX = this.screenWidth;
        this.limitY = this.screenHeight;
    },
    shot(_player, model) {
        this.node.zIndex = 1;
        this.player = _player;
        this.playerLocation = _player.playerLocation;
        // var dirArr = model.dirLocation.split(",");
        // var radian = Math.atan2(dirArr[1], dirArr[0]);
        // var bulletAngel = radian / Math.PI * 180;
        // if (bulletAngel < 0) {
        //     bulletAngel = (360 - Math.abs(bulletAngel));
        // } 
        this.node.angle = 0;
        var trackNode = cc.find("Canvas/trackNode");
        trackNode.addChild(this.node, 1, this.id);
        var pos = trackNode.parent.convertToWorldSpaceAR(trackNode.position);
        console.log(pos);
        this.node.position = pos;

        console.log(trackNode.position);
        //trackNode.parent.convertToWorldSpaceAR(trackNode.getComponent("bullet_wap").node.getPosition());
        console.log(model.weaponAngel);
        this.init(trackNode.position, 90);
    },
    // 根据武器等级设置子弹等级
    setBullet(model) {
        this.bulletLevel = model.bulletLevel;
        this.bulletType = model.bulletType;
        this.bulletId = model.bulletId;
        this.id = model.bulletId;
        // console.log(this.bulletId); 
    },
    init(pos, angle) {
        this.defSpeed = this.speed;
        if (_glbGameSkill.tagetTo != null) {
            this.speedBonus = 1;
        } else
            this.speedBonus = 1;
        // 
        if (this.playerLocation == 3 || this.playerLocation == 4) {
            this.speedX = -this.getSpeedX(this.defSpeed, Math.abs(angle)) * this.speedBonus;
            this.speedY = -this.getSpeedY(this.defSpeed, Math.abs(angle)) * this.speedBonus;
            //this.node.angle = -(angle + 180);
            // set first location
            this.node.position = cc.v2(this.node.x * Math.sin(this.node.angle / 180 * Math.PI), this.node.y * Math.cos(this.node.angle / 180 * Math.PI));

        } else {
            this.speedX = this.getSpeedX(this.defSpeed, Math.abs(angle)) * this.speedBonus;
            this.speedY = this.getSpeedY(this.defSpeed, Math.abs(angle)) * this.speedBonus;
            // set first location
            this.node.angle = 0;
            // set first location
            this.node.position = cc.v2(this.node.x * Math.sin(this.node.angle / 180 * Math.PI), this.node.y * Math.cos(this.node.angle / 180 * Math.PI));
        }

        this.callBack = function() {
            this.moveLogic(0.05);
        }
        this.schedule(this.callBack, 0.02, cc.macro.REPEAT_FOREVER);
        //this.node.parent = cc.director.getScene();
    },
    moveLogic(dt) {
        if ((this.speedY > 0 && this.node.y > this.limitY) || (this.speedY < 0 && this.node.y < 20)) {
            if (this.borderTotal <= 2) {
                this.speedY = -this.speedY;
                this.setRotation2();
                this.borderTotal++;
            } else {
                this.player.despawnBullet(this.node);
                return;
            }

        } else if ((this.speedX > 0 && this.node.x > this.limitX) || (this.speedX < 0 && this.node.x < 20)) {
            if (this.borderTotal <= 2) {
                this.speedX = -this.speedX;
                this.setRotation2();
                this.borderTotal++;
            } else {
                this.player.despawnBullet(this.node);
                return;
            }
        }
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
    },
    setRotation() //方法一
    {
        let dirVec = cc.v2(this.node.x, this.node.y);
        dirVec.x = this.speedX;
        dirVec.y = this.speedY;
        let upVec = cc.Vec2.UP;
        let degree = this.calculateAngle(dirVec, upVec);
        this.node.angle = -(180 + degree);
    },
    setRotation2() //方法二
    {
        let dirVec = cc.Vec2.ZERO;
        dirVec.x = this.speedX;
        dirVec.y = this.speedY;
        let upVec = cc.Vec2.UP;
        let radian = dirVec.signAngle(upVec);
        let degree = cc.misc.radiansToDegrees(radian);
        this.node.angle = -degree;
    },

    calculateAngle(first, second) {
        let len_y = second.y - first.y;
        let len_x = second.x - first.x;
        let tan_yx = Math.abs(len_y / len_x);
        let temp = Math.atan(tan_yx) * 180 / Math.PI;
        let angle = 0;
        if (len_y > 0 && len_x < 0) {
            angle = temp - 90;
        } else if (len_y > 0 && len_x > 0) {
            angle = -temp + 90;
        } else if (len_y < 0 && len_x < 0) {
            angle = -temp - 90;
        } else if (len_y < 0 && len_x > 0) {
            angle = temp + 90;
        } else if (len_y == 0 && len_x != 0) {
            angle = len_x < 0 ? -90 : 90;
        } else if (len_x == 0 && len_y != 0) {
            angle = len_y < 0 ? 180 : 0;
        }
        return angle;
    },

    getSpeedX(speedOrigin, moveAngle) {
        speedOrigin = Math.abs(speedOrigin);
        let speedX = 0;
        switch (moveAngle) {
            case 0:
                speedX = speedOrigin;
                break;
            case 90:
                break;
            case 270:
                break;
            case 180:
                speedX = -speedOrigin;
                break;
            default:
                speedX = this.getCosValue(moveAngle) * speedOrigin;
                break;
        }
        return speedX;
    },
    getSpeedY(speedOrigin, moveAngle) {
        speedOrigin = Math.abs(speedOrigin);
        let speedY = 0;
        switch (moveAngle) {
            case 0:
                break;
            case 90:
                speedY = speedOrigin;
                break;
            case 270:
                speedY = -speedOrigin;
                break;
            case 180:
                break;
            default:
                speedY = this.getSinValue(moveAngle) * speedOrigin;
                break;
        }
        return speedY;
    },
    getSinValue(angle) {
        return Math.sin(angle * Math.PI / 180);
    },
    getCosValue(angle) {
        return Math.cos(angle * Math.PI / 180);
    },

    onCollisionEnter(other, self) {
        let fish = other.node.getComponent("fish");
        let posb = self.world.points;
        let posNet = posb[0].add(posb[3]).mul(0.5);
        // 矩形碰撞组件顶点坐标，左上，左下，右下，右上
        if (_glbGameSkill.tagetTo != null) {
            if (fish.id == _glbGameSkill.tagetTo.id) {
                this.player.castNet(posNet);
                this.player.despawnBullet(this.node);
                CurrentService.SFxConnect.smartFox.gameAttackEnemy({
                    enemyId: fish.id,
                    bulletType: this.bulletType,
                    bulletId: this.bulletId
                });
            }

        } else {
            this.player.castNet(posNet);
            this.player.despawnBullet(this.node);
            CurrentService.SFxConnect.smartFox.gameAttackEnemy({
                enemyId: fish.id,
                bulletType: this.bulletType,
                bulletId: this.bulletId
            });
        }
    },
    update(dt) {
        //console.log(dt);
        //this.moveLogic(dt * 2);
    }
});