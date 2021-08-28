// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CurrentService from "../helper/current";

import HelperService from "../helper/help_service";
//
cc.Class({
    extends: cc.Component,
    properties: {
        fishPrefab: cc.Prefab,
        //
        fishTypes: Array,
        fishList: [],
        fishListTest: [cc.Prefab],
        drawLine: cc.Node,
        fishInMap: cc.NodePool,
        // player
        player: cc.Prefab,
        playerInRoom: Array,
        playerActived: cc.Prefab,
        // skill
        lblFreeze: cc.Label,
        lblFollow: cc.Label,
        lblSpeed: cc.Label,
        lblTicket: cc.Label,
        skillEffects: cc.Node,
        skBgFreeze: sp.Skeleton,
        skFreeze: sp.Skeleton,
        playerTaget: cc.Prefab,
        enemyTaget: cc.Prefab,
        //
        moveSprite: cc.Sprite,
        trackLayout: cc.Layout,
        // 
        tagetLocation: cc.Node,
        trackNode: cc.Node
    },
    setScreen: function() {
        //cc.view.resizeWithBrowserSize(true);
        //const actual_size = cc.view.getFrameSize();
        //console.log("::::" + actual_size);
        // var isMobile = (actual_size.width < 768);
        // const width = isMobile ? 640 : 960;
        // const height = isMobile ? 960 : 640;
        // cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.SHOW_ALL);

        //  var resourceSize = cc.size(480, 800);
        //  var designSize = cc.size(480, 800);
        // cc.director.setContentScaleFactor(resourceSize.width / designSize.width);
        // cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);

        // cc.view.setResolutionPolicy(cc.ResolutionPolicy.EXACT_FIT);
        //var screenSize = cc.view.getFrameSize();
        //cc.view.setDesignResolutionSize(screenSize.width, screenSize.height, cc.ResolutionPolicy.SHOW_ALL);
    },

    testMain() {
        console.log("main: runing");
        return "ok";
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        _glbGame = this;
        _scence = "game";
        HelperService.autoFixScreen();
        CurrentService.SFxConnect.smartFox.gameInit();
        // cc.director.getPhysicsManager().debugDrawFlags = 1;
        // ************************************************************************************************************ 
        this.trackLayout.node.active = false;
        //触摸结束事件 this.startPos = cc.p(0, 0);  //开始位置
        this.startPos = cc.v2(0, 0); //开始位置
        this.endPos = cc.v2(0, 0); //结束位置
        this.trackSprites = []; //装轨迹点

        //this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        // ************************************************************************************************************ 
        this.playerInRoom = [];
        this.setScreen();
        // 中间层是鱼
        cc.find('Canvas/bgGame').zIndex = -1;
        cc.find('Canvas/skillFrame').zIndex = 6;
        cc.game.canvas.style.cursor = 'pointer'; // default

        // 池子里面多放几条鱼 
        //this.netsPool = new cc.NodePool();
        //cc.debug.setDisplayStats(true);
        //
        //cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = 0;
        //
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        //cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //cc.director.getPhysicsManager().enabled = true;
        // this.touchingNumber = 0;

        var self = this;
        cc.resources.loadDir("prefab/enemy", cc.Prefab, function(err, fishPrefabs) {
            self.fishList = fishPrefabs;
            self.testMaps();
        });
    },
    start() {},


    // update(dt) {
    //     console.log(_glbGameSkill.tagetTo);

    // },
    //
    // init game
    playerLoad: function(model) {
        var users = model.users;
        users = [{
            ticket: 51,
            freezeSkill: 3356,
            bulletlevel: 1,
            speedSkill: 44,
            bullettype: "b-gold-100",
            avatar: 1,
            gem: 1000,
            gold: 999466100,
            displayname: "Allen",
            guntype: 1,
            x: -2.799999952316284,
            y: 4.599999904632568,
            position: 1,
            vip: 0,
            bullet: {
                _id: {
                    timestamp: 1627638832,
                    machineIdentifier: 3204872,
                    processIdentifier: 25333,
                    counter: 9012837
                },
                bulletid: "b-gold-100",
                atk: 100,
                speed: 0.35,
                cost: 100,
                gametype: "fish"
            },
            followSkill: 7605,
            username: "abcdee"
        }];
        users.forEach(element => {
            var user = {
                displayName: element.displayname,
                username: element.username,
                avatar: element.avatar,
                vip: element.vip,
                weaponType: element.guntype,
                bulletLevel: element.bulletlevel,
                bulletType: element.bullettype,
                gem: element.gem,
                gold: element.gold,
                position: element.position,
                isActived: false,
            };
            let player = cc.instantiate(this.player);
            player.active = false;
            player.name = element.username;
            this.playerInRoom.push(player);
            if (element.username == CurrentService.Login.username) {
                user.isActived = true;
                this.playerActived = player;
                // 
                this.lblFreeze.string = element.freezeSkill;
                this.lblFollow.string = element.followSkill;
                // this.lblSpeed.string = element.speedSkill;
                // this.lblTicket.string = element.ticket;
            }
            player.getComponent("player").init(this, user);

        });

    },
    playerAdd: function(element) {
        var user = {
            displayName: element.displayname,
            username: element.username,
            avatar: element.avatar,
            vip: element.vip,
            weaponType: element.guntype,
            bulletLevel: element.bulletlevel,
            bulletId: element.bulletid,
            gem: element.gem,
            gold: element.gold,
            position: element.position,
            isActived: false
        };
        // 
        var player = this.playerInRoom.find(x => x.name == element.username);
        if (player == undefined || player == null) {
            player = cc.instantiate(this.player);
            player.active = false;
            player.name = element.username;
            this.playerInRoom.push(player);
        }

        if (element.username == CurrentService.Login.username) {
            user.isActived = true;
            this.playerActived = player;
        }
        //  
        player.getComponent("player").init(this, user);
    },
    playerRemove: function(model) {
        var user = model.username;
        if (user == undefined || user == null)
            return;
        //
        var player = this.playerInRoom.find(x => x.name == user);
        const index = this.playerInRoom.indexOf(player);
        if (index > -1) {
            this.playerInRoom.splice(index, 1);
        }
        //
        if (player != undefined)
            player.destroy();
        //
    },

    bulletChange: function(model) {
        var user = model.username;
        if (user == undefined || user == null)
            return;
        // 
        var player = this.playerInRoom.find(x => x.name == user);
        if (player != undefined) {
            player.getComponent("player").bulletChange(model);
        }
    },
    weaponChange: function(model) {
        var user = model.username;
        if (user == undefined || user == null)
            return;
        // 
        var player = this.playerInRoom.find(x => x.name == user);
        if (player != undefined) {
            player.getComponent("player").weaponChange(model);
        }
    },

    testMaps: function() {
        console.log("Akay");
        var _fishMap = {
            "speedbonus": 0,
            "init": ["-108_292"],
            "path": [
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 },
                { "x": 0, "y": 300 },
                { "x": 1200, "y": 350 },
                { "x": 0, "y": 450 },
                { "x": 1200, "y": 600 }

            ],
            "color": "none",
            "id": "40527FB41002B59DA03A1012D",
            "pathid": "Path024_07",
            "angel": 45,
            "type": "cahe",
            "speed": 67.5
        };
        //一次创建3条鱼 #####################################################################################################  
        var fishPrefap = this.fishList.find(x => x.name == "_default"); //_fishMap.type  
        if (fishPrefap != undefined) {
            let fish = cc.instantiate(fishPrefap);
            fish.getComponent("fish").init(_fishMap, this);
        }
    },
    gameLoadMaps: function(_fishMap) {
        return;
        if (_fishMap == undefined || _fishMap.length == 0) {
            console.log("Error: cannot load fish maps.");
            return;
        }
        //一次创建3条鱼 #####################################################################################################  
        var fishPrefap = this.fishList.find(x => x.name == "_default"); //_fishMap.type  
        if (fishPrefap != undefined) {
            let fish = cc.instantiate(fishPrefap);
            fish.getComponent("fish").init(_fishMap, this);
        }
    },
    gameRemoveFish: function(_fish) {
        if (_fish == undefined || _fish == null) {
            console.log("Error: cannot load fish maps.");
            return;
        }
        var abc = cc.find(`Canvas/${_fish.enemy_id}`);
        if (abc != null) {
            abc.destroy();
        }
        //一次创建3条鱼 ##################################################################################################### 
    },
    playerShoot: function(model) {
        if (model.username == undefined || model.username == null) {
            return;
        };
        //
        var player = this.playerInRoom.find(x => x.name == model.username);
        if (player != undefined) {
            player.getComponent("player").playerShoot(this, {
                username: model.username,
                bulletId: model.bulletid,
                bulletLevel: model.bulletlevel,
                angel: model.angel,
                gold: model.gold,
                touchLocation: model.touch_location,
                dirLocation: model.location,
            });
        }
    },
    gameFishDie: function(model) {
        //console.log(model.enemy_id);
        if (model == undefined || model == null) {
            console.log("Error: cannot load fish maps.");
            return;
        }
        //
        var player = this.playerInRoom.find(x => x.name == model.username);
        if (player != undefined) {
            var fishDie = cc.find(`Canvas/${model.enemy_id}`);
            if (fishDie != null) {
                fishDie.getComponent("fish").fishDie(player, model);
            }
        }

    },
    playerSetSkill: function(model) {
        var _this = this;
        var isSkill = model.is_have;
        var isSkill = model.is_have;
        switch (model.skilltype) {
            case 1:
                break;
            case 2:
                if (isSkill) {
                    // hieu ung 
                    var bgSkeleton = this.skBgFreeze.getComponent(sp.Skeleton);
                    var skeleton = this.skFreeze.getComponent(sp.Skeleton);
                    skeleton.clearTrack(0);
                    skeleton.addAnimation(0, "animation", false, 0);
                    bgSkeleton.addAnimation(0, "animation", true, 1);
                    //
                    _glbGameSkill.freezeState = true;
                    var freezeTime = 5;
                    if (CurrentService.Login.username == model.username) {
                        this.lblFreeze.string = 5;
                    }
                    var myVar = setInterval(function() {
                        if (freezeTime == 0) {
                            clearInterval(myVar);
                            _glbGameSkill.freezeState = false;
                            if (CurrentService.Login.username == model.username) {
                                _this.lblFreeze.string = model.freezeSkill;
                                // hieu ung
                                bgSkeleton.addAnimation(0, "none", false, 0);
                                skeleton.clearTrack(0);
                            }
                            return;
                        }
                        freezeTime--;
                        if (CurrentService.Login.username == model.username) {
                            _this.lblFreeze.string = freezeTime;
                        }
                    }, 1000);
                }
                break;
            case 3:
                console.log("skill 1")
                break;
            case 4:
                if (CurrentService.Login.username == model.username) {
                    _glbGameSkill.tagetState = true;
                    this.lblFollow.string = model.followSkill;
                    //
                    var player = this.playerInRoom.find(x => x.name == model.username);
                    if (player != undefined) {
                        _this.playerTaget = player;
                    }
                }
                break;
            default:
                break;
        }
    },
    autoShootOnTaget: function(_taget1) {
        var _abc = cc.find(`Canvas/${_taget1}`);
        var _this = this;
        _glbGameSkill.tagetState = false;
        this.callBack = function() {
            if (_abc.name == "") {
                _this.unschedule(_this.callback);
                return;
            }
            //
            _this.playerTaget.getComponent("player").shotOnTaget(_abc);
        };
        this.schedule(this.callBack, 0.0001, cc.macro.REPEAT_FOREVER);
    },
    // ***************************************************************************************************************
    onDrawTrackMove: function(_endPos) {
        if (this.playerTaget != null) {
            var player = this.playerTaget.getComponent("player");
            //停止移动，为了避免没移动结束，却改变了目标位置
            this.moveSprite.node.stopAllActions();
            this.removeTrackSprites();
            //获取开始的位置 
            this.startPos = cc.find("Canvas").convertToNodeSpaceAR(player.weapon.node.parent.convertToWorldSpaceAR(player.weapon.node.getPosition()));
            this.endPos = _endPos;
            this.spriteMoveAction();
            this.drawTrack(this.endPos);
        }
    },

    spriteMoveAction: function() {
        //获得2点之间的距离
        let distance = this.startPos.mag(this.endPos);
        //计算移动需要话费的时间，时间 = 距离 / 速度
        let moveTime = distance / 1200;
        // cc.log("move = ", this.endPos.x, this.endPos.y);
        //变速移动 
        let moveTo = cc.moveTo(moveTime, this.endPos).easing(cc.easeInOut(3));
        //回调函数
        let callfunc = cc.callFunc(function() {
            this.trackLayout.node.active = false;
        }, this);
        //让sprite移动
        this.moveSprite.node.runAction(cc.sequence(moveTo, callfunc));
        //this.playerTaget.getComponent("player").shotOnTaget(this.endPos, this.endPos);
    },

    //绘制轨迹路线
    drawTrack: function(end) {
        this.trackLayout.node.active = true;
        this.trackLayout.node.setPosition(this.startPos);
        let distance = this.startPos.mag(this.endPos); //cc.pDistance(, this.endPos);var v = cc.v2(point1, point2);
        //获得轨迹点
        this.trackSprite = this.trackLayout.node.getChildByName("trackSprite");
        //轨迹点数量
        let trackNum = Math.floor(distance / (this.trackSprite.width + this.trackLayout.spacingX));
        for (i = 1; i < trackNum; i++) {
            //克隆轨迹点
            let trackSpriteTemplate = cc.instantiate(this.trackSprite);
            this.trackLayout.node.addChild(trackSpriteTemplate);
            trackSpriteTemplate.zIndex = 99;
            this.trackSprites.push(trackSpriteTemplate);
        }
        //向量差计算,结束点-开始点，向量的指向是朝着结束点
        var posSub = this.endPos.sub(this.startPos);
        //向量的角度计算，cc.pToAngle是获得弧度值，角度 = 弧度/PI*180
        var angle = Math.atan2(posSub.y, posSub.x) / Math.PI * 180;
        //rotation 是逆时针旋转的，在角度添加负号才正确
        this.trackLayout.node.angle = angle;

    },

    //移除轨迹点
    removeTrackSprites: function() {
        for (i = 0; i < this.trackSprites.length; i++) {
            let trackSprite = this.trackSprites[i];
            if (trackSprite) {
                trackSprite.removeFromParent();
            }
        }
    }
});