// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CurrentService from "../helper/current";
// 
cc.Class({
    extends: cc.Component,

    properties: {
        //
        lblName: cc.Label,
        lblGold: cc.Label,
        lblLevel: cc.Label,
        lblVip: cc.Label,
        lblBulletLevel: cc.Label,
        goldVal: cc.Integer = 0,
        // 
        weapon: cc.Node,
        weapon_impact: cc.Node,
        bulletWap: cc.Node,
        weaponType: cc.Integer = 1,
        bulletPrefab: cc.Prefab,
        bulletLevel: cc.Integer = 1,
        bulletId: cc.String = "",
        bulletType: cc.String = "",
        cost: cc.Integer = 0,
        playerLocation: cc.Integer = 0,
        coinNode: cc.Node,
        //
        isActived: cc.Boolean = false,
        isWaitState: cc.Boolean = true,
        bulletList: [cc.Prefab],
        btnShowWeapon: cc.Node,
        //
        netsPool: cc.NodePool,
        netPrefab: cc.Prefab,
        oneNet: cc.Node,
        //
        //bulletPool: cc.NodePool,
        oneBullet: cc.Node,
        //
        coinController: cc.Node,
        game: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.netsPool = new cc.NodePool();
        //this.bulletPool = new cc.NodePool("bullet");
    },

    start() {

    },

    // update (dt) {},
    init: function(_game, _player) {
        // 
        this.game = _game;
        this.node.zIndex = 5;
        this.weaponType = _player.weaponType;
        this.bulletLevel = _player.bulletLevel;
        this.bulletType = _player.bulletType;
        this.isActived = _player.isActived;
        this.lblName.string = _player.displayName;
        this.goldVal = _player.gold;
        // 
        this.coinController.getComponent("coin_controller").setValue(this.goldVal);
        if (_player.weaponType == undefined || _player.weaponType < 1) this.weaponType = 1;
        if (_player.bulletLevel == undefined || _player.bulletLevel < 1) this.bulletLevel = 1;
        this.node.parent = cc.find('Canvas');
        var widget = this.node.getComponent(cc.Widget);
        var frameWeapon = this.node.getChildByName("frame_weapon");
        frameWeapon.zIndex = 6;
        var frameText = this.node.getChildByName("frame_text");
        //var frameAwait = this.node.getChildByName("frame_await");
        var widgetWeapon = frameWeapon.getComponent(cc.Widget);
        var widgetText = frameText.getComponent(cc.Widget);
        //
        this.playerLocation = _player.position;
        var btnMinusPosition = frameWeapon.getChildByName("btnMinus").getPosition();
        var btnPlusPosition = frameWeapon.getChildByName("btnPlus").getPosition();
        switch (this.playerLocation) {
            case 1:
                widget.isAlignLeft = true;
                widget.isAlignBottom = true;
                widget.left = 100;
                widget.button = 0;
                break;
            case 2:
                widget.isAlignRight = true;
                widget.isAlignBottom = true;
                widget.right = 100;
                widget.button = 0;
                //
                widgetWeapon.isAlignRight = false;
                widgetWeapon.isAlignLeft = true;
                widgetWeapon.left = 0;
                //
                widgetText.isAlignLeft = false;
                widgetText.isAlignRight = true;
                widgetText.right = 0;
                break;
            case 3:
                this.node.angle = 180;
                this.node.getChildByName("frame_text").angle = 180;
                frameWeapon.getChildByName("lblBulletLevel").angle = 180;
                frameWeapon.getChildByName("btnPlus").setPosition(btnMinusPosition);
                frameWeapon.getChildByName("btnMinus").setPosition(btnPlusPosition);
                //frameAwait.angle = 180;
                widget.isAlignRight = true;
                widget.isAlignTop = true;
                widget.right = 100;
                widget.top = 0;
                break;
            case 4:
                this.node.angle = 180;
                this.node.getChildByName("frame_text").angle = 180;
                frameWeapon.getChildByName("lblBulletLevel").angle = 180;
                frameWeapon.getChildByName("btnPlus").setPosition(btnMinusPosition);
                frameWeapon.getChildByName("btnMinus").setPosition(btnPlusPosition);
                //
                widget.isAlignLeft = true;
                widget.isAlignTop = true;
                widget.left = 100;
                widget.top = 0;
                //
                widgetWeapon.isAlignRight = false;
                widgetWeapon.isAlignLeft = true;
                widgetWeapon.left = 0;
                //
                widgetText.isAlignLeft = false;
                widgetText.isAlignRight = true;
                widgetText.right = 0;
                break;
            default:
                break;
        };

        //render weapon
        //frameAwait.active = false;
        this.node.active = true;
        this.weapon = this.weapon.getComponent("weapon");
        this.weapon.init(3, 1);
        this.weaponList = this.weapon.skeletons;
        var skeleton = this.weapon.getComponent(sp.Skeleton);
        skeleton.skeletonData = this.weaponList[this.weaponType - 1];
        //Animation
        skeleton.addAnimation(0, "idle_0", false, 0);
        skeleton.clearTrack(0);
        skeleton.addAnimation(0, "speed_1", false); //Add directly to the pipeline queue 
        // 
        let _this = this;
        //let wp = this.weapon;
        let weaponPos = _this.weapon.node.getPosition();
        if (this.isActived) {
            frameWeapon.getChildByName("btnPlus").active = true;
            frameWeapon.getChildByName("btnMinus").active = true;
            //var tagetPos = cc.find("Canvas").convertToNodeSpaceAR(weaponPos);
            // console.log(cc.find("Canvas").convertToNodeSpaceAR(_this.weapon.node.parent.convertToWorldSpaceAR(weaponPos))); 
            //this.game.trackNode.position = cc.v2(cc.find("Canvas").convertToNodeSpaceAR(cc.v2(abc.x, 47)).x + 100, cc.find("Canvas").convertToNodeSpaceAR(cc.v2(abc.x, 47)).y);
            //this.node.active = false;

        }
        _game.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            if (_this.isActived) {
                cc.macro.ENABLE_MULTI_TOUCH = false;
                event.stopPropagationImmediate();
                // send poisition  
                let touchPos = _this.weapon.node.parent.convertToNodeSpaceAR(event.getLocation());
                // // 炮台坐标           
                // // 炮台到触点的方向向量
                let dir = touchPos.sub(weaponPos); //  <=> this.node.x - weaponPos.x , this.node.y - weaponPos.y
                // // 计算夹角，这个夹角是带方向的 
                let angle = cc.v2(dir).signAngle(cc.v2(0, 1)); // or dir.signAngle(cc.Vec2.UP);
                // //将弧度转换为欧拉角
                let degree = angle / Math.PI * 180; // or cc.misc.radiansToDegrees(angle2);
                //   
                CurrentService.SFxConnect.smartFox.gamePlayerShot({
                    angel: parseInt(-degree),
                    location: `${dir.x},${dir.y}`,
                    touchLocation: `${touchPos.x},${touchPos.y}`,
                    bulletType: _this.bulletType
                });
            }
        }, _game);
        _game.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            event.stopPropagation();
        }, _game);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
            event.stopPropagation();
        }, this);
    },
    playerShoot: function(_game, model) {
        var skeleton = this.weapon.getComponent(sp.Skeleton);
        skeleton.clearTrack(0);
        skeleton.addAnimation(0, "speed_1", false);
        //
        var impactSckeleton = this.weapon_impact.getComponent(sp.Skeleton);
        impactSckeleton.clearTrack(0);
        impactSckeleton.addAnimation(0, "animation", false);
        //
        this.bulletLevel = model.bulletLevel;
        this.bulletId = model.bulletId;
        this.bulletPrefab = cc.instantiate(this.bulletList[this.bulletLevel - 1]);
        //
        this.weapon.node.angle = model.angel;
        this.bulletPrefab.name = model.bulletId;
        //  *****************************************************************************************************************************
        var pos = cc.find("Canvas").convertToNodeSpaceAR(this.weapon.node.parent.convertToWorldSpaceAR(this.weapon.node.getPosition()));
        var trackNode = cc.find("Canvas/trackNode");
        trackNode.zIndex = 100;
        trackNode.angle = model.angel;
        trackNode.position = pos;
        //let bpos = cc.v2(pos.x + 120 * Math.sin(model.angel / 180 * 3.14), pos.y + 120 * Math.cos(model.angel / 180 * 3.14));
        // if (this.playerLocation == 3 || this.playerLocation == 4) {
        //     this.node.angle = -(this.angle - 180);
        //     bpos = cc.v2(_weaponPos.x - 120 * Math.sin(this.angle / 180 * 3.14), _weaponPos.y - 120 * Math.cos(this.angle / 180 * 3.14));
        // }
        // trackNode.position = cc.v2(pos.x * Math.sin(-model.angel / 180 * Math.PI), pos.y * Math.cos(-model.angel / 180 * Math.PI));
        //trackNode.position = bpos;
        //trackNode.parent = cc.director.getScene();
        //trackNode.addChild(this.bulletPrefab, 1, model.bulletId);
        //console.log(trackNode);

        this.bulletPrefab.getComponent("bullet").setBullet({
            bulletLevel: this.bulletLevel,
            bulletType: this.bulletType,
            bulletId: this.bulletId,
        });

        this.goldVal = model.gold;
        if (!CurrentService.GameSkill.tagetState)
            this.bulletPrefab.getComponent("bullet").shot(this, {
                touchLocation: model.touchLocation,
                dirLocation: model.dirLocation,
                weaponAngel: model.angel
                    //trackNode: this.game.trackNode
            });
        // 
        this.coinController.getComponent("coin_controller").setValue(this.goldVal);
    },
    bulletChange: function(model) {
        if (model.bulletLevel < 1 && model.bulletLevel > 4)
            return;
        // 
        this.bulletLevel = model.level;
        this.bulletType = model.bulletType;
        this.cost = model.cost;
        this.lblBulletLevel.string = this.cost;
        this.bulletPrefab.getComponent("bullet").setBullet(this.bulletLevel, this.bulletType);
        //
        var skeleton = this.weapon.getComponent(sp.Skeleton);
        skeleton.clearTrack(0);
        skeleton.addAnimation(0, "speed_1", false); //Add directly to the pipeline queue 
    },
    showWeapon: function(model) {
        if (this.isActived) {
            cc.find('WeaponList').active = true;
            cc.find('WeaponList').zIndex = 5;
        }
    },
    weaponChange: function(model) {
        if (model.weaponType < 1 && model.weaponType > 4)
            return;
        //
        this.weaponType = model.guntype;
        var skeleton = this.weapon.getComponent(sp.Skeleton);
        skeleton.skeletonData = this.weaponList[this.weaponType - 1];
        //
        skeleton.clearTrack(0);
        skeleton.addAnimation(0, "idle_0", false, 0);
        skeleton.addAnimation(0, "XUATHIEN", false, 0.8);
    },
    // castNet ***************************************************************************************
    castNet: function(position) {
        if (this.netsPool.size() > 0)
            this.oneNet = this.netsPool.get(this);
        else
            this.oneNet = cc.instantiate(this.netPrefab);
        //
        let bulletLevel = this.weapon.getComponent("weapon").curLevel;
        this.oneNet.getComponent("Net").init(position, this, bulletLevel);
    },
    despawnNet: function(net) {
        this.netsPool.put(net);
    },
    // despawnBullet: function(_bullet) {
    //     this.bulletPool.put(_bullet);
    // },
    gainCoins: function(_fishPos, value) {
        this.goldVal += value;
        var coinPos = this.lblGold.node.position;
        this.coinNode.getComponent("coin_controller").gainCoins(_fishPos, coinPos, value, this.goldVal);
    },
    // taget
    shotOnTaget: function(tagetPos) {
        if (this.isActived) {
            let weaponPos1 = this.weapon.node.position;
            let weaponPos = cc.find('Canvas').convertToNodeSpaceAR(weaponPos1);
            let touchPos = this.weapon.node.parent.convertToNodeSpaceAR(tagetPos);
            // // 炮台到触点的方向向量
            let dir = touchPos.sub(weaponPos);
            // // 计算夹角，这个夹角是带方向的
            if (dir.x == 0 && dir.y == 0) {
                dir.x = 1;
                dir.y = 1;
            }
            let angle = cc.v2(dir).signAngle(cc.v2(0, 1));
            var degree = angle / Math.PI * 180;
            //
            CurrentService.SFxConnect.smartFox.gamePlayerShot({
                angel: parseInt(-degree),
                location: ``,
                touchLocation: `${touchPos.x},${touchPos.y}`,
                bulletType: this.bulletType
            });
        }
    }
});