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

    },
    onLoad() {
        this.speed = 1000;
        this.speedBonus = 1;
    },

    start() {
        this.screenWidth = Math.floor(cc.winSize.width);
        this.screenHeight = Math.floor(cc.winSize.height);
        // this.limitX = this.screenWidth - 120;
        // this.limitY = this.screenHeight - 120;
        this.limitX = this.screenWidth / 2;
        this.limitY = this.screenHeight / 2;

    },
    shot(_player) {
        this.node.zIndex = 1;
        this.player = _player;
        this.playerLocation = _player.playerLocation;
        //this.node.position = _player.weapon.node.parent.convertToWorldSpaceAR(_player.weapon.node.getPosition());
        //this.angle = -_player.weapon.node.angle;
        // //this.node.angle = this.angle;
        // let bpos = cc.v2(this.node.x + 120 * Math.sin(this.angle / 180 * Math.PI), this.node.y + 120 * Math.cos(this.angle / 180 * Math.PI));
        // //
        // if (this.playerLocation == 3 || this.playerLocation == 4) {
        //     this.angle = this.angle - 180;
        //     bpos = cc.v2(this.node.x + 120 * Math.sin(this.angle / 180 * Math.PI), this.node.y + 120 * Math.cos(this.angle / 180 * Math.PI));
        // }
        //  
        //this.init(bpos, 90 - this.angle);
        //this.init(cc.Vec2(this.node.position.x, this.node.position.y), -90);
        this.init(cc.Vec2.ZERO, 500, 45);
    },
    // 根据武器等级设置子弹等级
    setBullet: function(model) {
        this.bulletLevel = model.bulletLevel;
        this.bulletType = model.bulletType;
        this.bulletId = model.bulletId;
    },
    init(pos, defSpeed, angle) {
        console.log(1111111111111111);
        this.defSpeed = defSpeed;
        this.node.position = pos;
        this.speedX = this.getSpeedX(this.defSpeed, Math.abs(angle));
        this.speedY = this.getSpeedY(this.defSpeed, Math.abs(angle));
        this.node.rotation = 90 - angle;
        this.callBack = function() {
            this.moveLogic(0.002);
        }
        this.schedule(this.callBack, 0.02, cc.macro.REPEAT_FOREVER);
    },
    // LIFE-CYCLE CALLBACKS:  
    moveLogic(dt) {
        if ((this.speedY > 0 && this.node.y > this.limitY) || (this.speedY < 0 && this.node.y < -this.limitY)) {
            this.speedY = -this.speedY;
            this.setRotation();
        } else if ((this.speedX > 0 && this.node.x > this.limitX) || (this.speedX < 0 && this.node.x < -this.limitX)) {
            this.speedX = -this.speedX;
            this.setRotation();
        }
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
    },
    setRotation() //方法一
    {
        let dirVec = cc.Vec2.ZERO;
        dirVec.x = this.speedX;
        dirVec.y = this.speedY;
        let upVec = cc.Vec2.UP;
        let degree = this.calculateAngle(dirVec, upVec);
        this.node.rotation = 180 + degree;
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
        // console.log('Temp', temp);
        // console.log('Angle ', angle)
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
});