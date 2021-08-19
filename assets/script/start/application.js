const i18n = require('i18n');
const SFS2X = require('sfs2x-api');
import HelperModel from "../library/model_heper";
//
import ServerService from "../helper/server_config";
import CurrentService from "../helper/current";
import DeviceService from "../network/uuid-service";
import Notification from "../helper/notification";
//

import HelperService from "../helper/help_service";
var sfs = null;
var objRequest = new SFS2X.SFSObject();
//************************************************************************************************************
cc.Class({
        extends: cc.Component,
        properties: {
            lblIp: cc.Label,
            lblLoad: cc.Label,
            lblNote: cc.Label,
            processBar: cc.Sprite,
            loadCount: cc.Interger = 0,
            lblTest: cc.Label,
            progress: cc.Interger = 0
        },
        onLoad: async function() {
            HelperService.autoFixScreen();
            var ip = await DeviceService.getNetwork();
            CurrentService.Device = _glbDevice = await DeviceService.getDevice();
            CurrentService.Network = _glbNetwork = {
                ip: ip,
                countryCode: "VN",
                timezone: "Asia/Bangkok",
            };
            if (CurrentService.Network == null) {
                console.log("Can't load network")
                return;
            }
            if (CurrentService.Network == null) {
                console.log("Can't load device")
                return;
            }
            //  ******************************************************************************************************************** 
            var config = ServerService.server;
            if (config == null) {
                console.log("Can't config server")
                return;
            }
            // SmartFox client instance
            sfs = new SFS2X.SmartFox(config);
            sfs.logger.level = SFS2X.LogLevel.DEBUG;
            // Add event listeners
            sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
            sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);
            sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this.onUserVariablesUpdate, this);
            sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.onExtensionResponse, this);
            sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.playerDisconnect, this);
            sfs.connect();
            //  ******************************************************************************************************************** 

        },
        playerDisconnect() {
            console.log("::re-connect....");
            //sfs.disconnect();
            //
            // var config = ServerService.server;
            // if (config == null) {
            //     console.log("::can't config server")
            //     return;
            // }
            // SmartFox client instance
            // sfs = new SFS2X.SmartFox(config);
            // sfs.logger.level = SFS2X.LogLevel.DEBUG;
            // // Add event listeners
            // sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onReConnection, this);
            // sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);
            // sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this.onUserVariablesUpdate, this);
            // sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.onExtensionResponse, this);
            // sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.playerDisconnect, this);
            // sfs.connect();
            cc.director.loadScene("start");
        },

        Application() {
            var _this = this;
            var _loadCount = 0;
            var cnt = 0;
            var intervalLoading = setInterval(() => {
                var state = CurrentService.Loading;
                if (state == null && cnt != 0 && cnt % 10 == 0) {
                    clearInterval(intervalLoading);
                    _this.onLoad();
                    return;
                }
                if (_loadCount * 25 == 100) {
                    //_this.lblNote.string = "Sẵn sàng!"
                    clearInterval(intervalLoading);
                    cc.director.loadScene("viet_menu");
                    _loadCount = 0;
                }
                //
                if (state != null && _loadCount <= 5) {
                    if (state.connect == 1) {
                        state.connect = -1;
                        _loadCount++;
                        _this.fillBar(_loadCount);
                    }
                    if (state.login == 1) {
                        state.login = -1;
                        _loadCount++;
                        _this.fillBar(_loadCount);
                    }
                    // if (state.room == 1) {
                    //     state.room = -1;
                    //     _loadCount++;
                    //     _this.fillBar(_loadCount);
                    // }
                    if (state.loadIp == 1) {
                        state.loadIp = -1;
                        _loadCount++;
                        _this.fillBar(_loadCount);
                    }
                    if (state.device == 1) {
                        state.device = -1;
                        _loadCount++;
                        _this.fillBar(_loadCount);
                    }
                }
                cnt++;
            }, 1000);
        },
        fillBar(_cnt) {
            var toatal = 0;
            if (_cnt * 25 < 100) {
                toatal = _cnt * 25;
            } else {
                toatal = 100;
            }
            this.lblLoad.string = `${toatal}%`;
            this.progress += 0.25;
            if (this.progress != NaN) {
                this.processBar.fillRange = this.progress;
            }

        },
        async onConnection(event) {
            console.log(CurrentService.Device.id);
            this.lblIp.string = `IP: ${CurrentService.Network.ip}/OS: ${DeviceService.getDeviceName(CurrentService.Device.item)}, ${CurrentService.Device.item.os}`;
            this.Application();
            if (event.success) {
                CurrentService.SFxConnect = _glbSFxConnect = {
                    smartFox: this,
                    state: true,
                    count: 0
                };
                sfs.send(new SFS2X.LoginRequest(CurrentService.Device.id));
                //  
                _glbLoading.connect = 1;
                CurrentService.SFxConnect.state = true;
                objRequest.putUtfString("deviceid", CurrentService.Device.id);
                objRequest.putUtfString("client", DeviceService.getDeviceName(CurrentService.Device.item));
                objRequest.putUtfString("versioncode", "ichim_android_on_iap");
                objRequest.putUtfString("gamecode", "ChimMoi");
                objRequest.putUtfString("gametype", "fish");
                objRequest.putInt("date", 3);
                objRequest.putInt("pagesize", 50);
                objRequest.putUtfString("ipAddress", `${CurrentService.Network.ip}`);
                objRequest.putUtfString("language", CurrentService.Device.type.language);
                objRequest.putUtfString("language_code", CurrentService.Device.type.language);
                objRequest.putUtfString("hashKey", CurrentService.Device.hashKey);
                objRequest.putInt("code", 3);
                objRequest.putUtfString("tool", "cc");
            } else {
                CurrentService.SFxConnect.state = false;
                console.log("Connection failed");
            }
        },
        async onReConnection(event) {
            if (event.success) {
                CurrentService.SFxConnect = _glbSFxConnect = {
                    smartFox: this,
                    state: true,
                    count: 0
                };
                sfs.send(new SFS2X.LoginRequest(CurrentService.Device.id));
                //  
                CurrentService.SFxConnect.state = true;
                objRequest.putUtfString("deviceid", CurrentService.Device.id);
                objRequest.putUtfString("client", DeviceService.getDeviceName(CurrentService.Device.item));
                objRequest.putUtfString("versioncode", "ichim_android_on_iap");
                objRequest.putUtfString("gamecode", "ChimMoi");
                objRequest.putUtfString("gametype", "fish");
                objRequest.putInt("date", 3);
                objRequest.putInt("pagesize", 50);
                objRequest.putUtfString("ipAddress", `${CurrentService.Network.ip}`);
                objRequest.putUtfString("language", CurrentService.Device.type.language);
                objRequest.putUtfString("language_code", CurrentService.Device.type.language);
                objRequest.putUtfString("hashKey", CurrentService.Device.hashKey);
                objRequest.putInt("code", 3);
                objRequest.putUtfString("tool", "cc");
            } else {
                CurrentService.SFxConnect.state = false;
                console.log("Connection failed");
            }
        },
        onLogin(event) {
            var userVars = [];
            userVars.push(new SFS2X.SFSUserVariable("gamecode", "ChimMoi"));
            userVars.push(new SFS2X.SFSUserVariable("gametype", "fish"));
            userVars.push(new SFS2X.SFSUserVariable("language", CurrentService.Device.type.language)); //
            userVars.push(new SFS2X.SFSUserVariable("languagecode", CurrentService.Device.type.language));
            userVars.push(new SFS2X.SFSUserVariable("deviceid", CurrentService.Device.id));
            userVars.push(new SFS2X.SFSUserVariable("ipAddress", CurrentService.Network.ip));
            userVars.push(new SFS2X.SFSUserVariable("hashKey", CurrentService.Device.hashKey));
            userVars.push(new SFS2X.SFSUserVariable("date", 3));
            userVars.push(new SFS2X.SFSUserVariable("code", 3)); //_device.code
            userVars.push(new SFS2X.SFSUserVariable("branch", "ichim_android_on_iap")); //_device.branch
            userVars.push(new SFS2X.SFSUserVariable("client", DeviceService.getDeviceName(CurrentService.Device.item))); // android, ios, webgl
            userVars.push(new SFS2X.SFSUserVariable("pagesize", 50));
            userVars.push(new SFS2X.SFSUserVariable("tool", "cc"));
            //
            sfs.send(new SFS2X.SetUserVariablesRequest(userVars));
            // loading
            _glbLoading.login = 1;
            _glbLoading.loadIp = 1;
            _glbLoading.device = 1;
        },
        onUserVariablesUpdate: function(evtParams) {
            this.joinLobbyRoom();
        },

        joinLobbyRoom: function() {
            if (sfs.lastJoinedRoom == null || sfs.lastJoinedRoom.name != "lobby") {
                sfs.send(new SFS2X.JoinRoomRequest("lobby"));
            }
        },
        onExtensionResponse(evtParams) {
            switch (evtParams.cmd) {
                case "sync_jackpot":
                    break;
                case "check_version":
                    //sfs.send(new SFS2X.ExtensionRequest("version_enemy", objRequest, sfs.lastJoinedRoom));
                    //
                    this.getNotification();
                    break;
                case "add_enemy":
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.gameLoadMaps(JSON.parse(result.data));
                    break;
                case "remove_enemy":
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    //console.log("remove_enemy result::::::::" + result.enemy_id);
                    //_glbGame.gameRemoveFish(result);
                    break;
                case "enemy_die":
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    console.log("chet: " + result.username);
                    //return;
                    // _glbGame.gameFishDie({
                    //     earn: result.earn,
                    //     enemy_id: result.enemy_id,
                    //     multiple: result.multiple,
                    //     username: result.username
                    // });
                    break;
                case "all_bird_room_gold":
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    // console.log(result);
                    break;
                case "version_responsecode":
                    var array = evtParams.params.getSFSArray("data");
                    var result2 = HelperModel.convertArrayToObject(array);
                    //msgContent = HelperModel.readMessage(result2._dataHolder);
                    break;
                case "user_login": // login and register 
                    //Map 
                    var logInModel = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    if (logInModel.success != undefined && logInModel.success) {
                        CurrentService.LoginState = _glbLoginState = logInModel.success;
                        if (logInModel.avatar == "")
                            logInModel.avatar = "1";
                        //
                        CurrentService.Login = _glbLogin = {
                            username: logInModel.username,
                            displayname: logInModel.displayname,
                            avatar: logInModel.avatar,
                            vip: logInModel.vip,
                            gold: logInModel.gold,
                            gem: logInModel.gem,
                            token: logInModel.token
                        };
                        if (CurrentService.Login != null) {
                            cc.director.loadScene("viet_menu");
                        }
                    }
                    break;
                case "change_user_profile": // user change  profile
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbLogin.displayname = result.displayname;
                    _glbLogin.avatar = result.avatar;
                    _glbMenu.playerLoad();
                    _glbMenu.profileLoad();
                    Notification.ShowMessage("Thông báo", result.errorMessageCode);
                    break;
                case "user_join_room_gold": // room 
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    objRequest.putInt("room_type", 100); // bullet level  value // 100,200,300
                    // objRequest.putInt("screen_width", cc.winSize.width);
                    // objRequest.putInt("screen_height", cc.winSize.height);
                    objRequest.putUtfString("token", CurrentService.Login.token);
                    objRequest.putUtfString("username", CurrentService.Login.username);
                    //
                    sfs.send(new SFS2X.ExtensionRequest("all_user_room_gold", objRequest, sfs.lastJoinedRoom));
                    break;
                case "all_user_room_gold": // player  
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerLoad(JSON.parse(result.data));
                    //
                    objRequest.putInt("room_type", 100);
                    objRequest.putUtfString("token", CurrentService.Login.token);
                    objRequest.putUtfString("username", CurrentService.Login.username);
                    //
                    sfs.send(new SFS2X.ExtensionRequest("all_bird_room_gold", objRequest, sfs.lastJoinedRoom));
                    break;
                case "user_out_room": // user out  
                    //console.log("user_out_room");
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerRemove(result);
                    break;
                case "add_user_room_gold": // user add
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerAdd(JSON.parse(result.data));
                    break;

                case "version_iap": // **********************************************************************************
                    var data = evtParams.params.getSFSArray("data");
                    var result = [];
                    if (data != null && data != undefined) {
                        for (var i = 0; i < data.size(); i++) {
                            var e = data.getSFSObject(i);
                            var objectItem = HelperModel.convertMapEntries_ToObject(e);
                            result.push(objectItem);
                        }
                        _glbMenu.storeLoad(result);
                    }
                    break;
                case "send_mail_by_page": // *****************************************************************************
                    var data = evtParams.params.getSFSArray("data");
                    var result = [];
                    if (data != null && data != undefined) {
                        for (var i = 0; i < data.size(); i++) {
                            var e = data.getSFSObject(i);
                            var objectItem = HelperModel.convertMapEntries_ToObject(e);
                            objectItem.content = `Day la con ten ${i} can hien thi nek.... :)`;
                            result.push(objectItem);
                            result.push(objectItem);
                        }
                        _glbMenu.mailLoad(result);
                    }

                    break;
                case "user_change_gun": // *****************************************************************************
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.weaponChange({
                        username: result.username,
                        guntype: result.guntype
                    });
                    break;
                case "user_change_bullet": // *****************************************************************************
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    var bullet = JSON.parse(result.bullet.replace("\\", ""));
                    _glbGame.bulletChange({
                        username: result.username,
                        bulletType: result.bullettype,
                        level: result.bulletlevel,
                        atk: bullet.atk,
                        cost: bullet.cost,
                        speed: bullet.speed
                    });
                    break;
                case "user_shoot": // ***************************************************************************** 
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerShoot(result);
                    break;
                case "use_attack_skill": // ***************************************************************************** 
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerSetSkill(result);
                    break;
                case "bot_shoot": // ***************************************************************************** 
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbGame.playerShoot(result);
                    break;
                case "notification": // notification
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    _glbMenu.notificationLoad();
                    break;
                case "private_popup": // **********************************************************************************
                    var result = HelperModel.convertMapEntries_ToObject(evtParams.params);
                    Notification.ShowMessage("Thông báo", result.errorMessageCode);
                    break;
                default:
                    break;
            }
        },
        getNotification() {
            sfs.send(new SFS2X.ExtensionRequest("version_responsecode", objRequest, sfs.lastJoinedRoom));
        },
        // login by account id, password id
        loginOnQuickLogin(account, password) {
            objRequest.putUtfString("loginType", "LOGIN_PLAYNOW");
            objRequest.putUtfString("username", "");
            objRequest.putUtfString("password", "");
            sfs.send(new SFS2X.ExtensionRequest("user_login", objRequest, sfs.lastJoinedRoom));
        },
        loginOnAccount(account, password) {
            objRequest.putUtfString("loginType", "LOGIN_PASSWORD");
            objRequest.putUtfString("username", account);
            objRequest.putUtfString("password", password);
            sfs.send(new SFS2X.ExtensionRequest("user_login", objRequest, sfs.lastJoinedRoom));
        },
        registerOnAccount(model) {
            objRequest.putUtfString("displayname", model.displayname);
            objRequest.putUtfString("username", model.account);
            objRequest.putUtfString("password", model.password);
            objRequest.putUtfString("password_retype", model.rePassword);
            objRequest.putUtfString("email", "");
            objRequest.putUtfString("mobile", "");
            //
            sfs.send(new SFS2X.ExtensionRequest("create_account", objRequest, sfs.lastJoinedRoom));
        },
        //user #################################################################################################################
        userProfileChange(model) {
            objRequest.putInt("avatar", model.avatar);
            objRequest.putUtfString("displayname", model.displayName);
            sfs.send(new SFS2X.ExtensionRequest("change_user_profile", objRequest, sfs.lastJoinedRoom));
        },
        menuStore() {
            sfs.send(new SFS2X.ExtensionRequest("version_iap", objRequest, sfs.lastJoinedRoom));
        },
        menuMailbox() {
            objRequest.putInt("page ", 0);
            sfs.send(new SFS2X.ExtensionRequest("send_mail_by_page", objRequest, sfs.lastJoinedRoom));
        },
        // Game Play #################################################################################################################
        gameInit() {
            console.log("Game init!");
            objRequest.putInt("room_type", 100);
            objRequest.putUtfString("token", CurrentService.Login.token);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("user_join_room_gold", objRequest, sfs.lastJoinedRoom));
        },
        gamePlayerLoadAll() {
            objRequest.putInt("room_type", 100);
            objRequest.putUtfString("token", CurrentService.Login.token);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("all_user_room_gold", objRequest, sfs.lastJoinedRoom));
        },
        gameBulletChangeRq(_bulletlevel) {
            objRequest.putInt("bulletlevel", _bulletlevel);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("user_change_bullet", objRequest, sfs.lastJoinedRoom));
        },
        gameWeaponChangeRq(_guntype) {
            objRequest.putInt("guntype", _guntype);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("user_change_gun", objRequest, sfs.lastJoinedRoom));
        },
        gamePlayerShot(_model) {
            objRequest.putInt("angel", _model.angel);
            objRequest.putUtfString("bullettype", _model.bulletType);
            objRequest.putUtfString("location", _model.location);
            objRequest.putUtfString("touch_location", _model.touchLocation);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("user_shoot", objRequest, sfs.lastJoinedRoom));
        },
        // 
        gameRemoveEnemy(_id) {
            //console.log("destroy_enemy:" + _id);
            objRequest.putUtfString("enemyid", _id);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("destroy_enemy", objRequest, sfs.lastJoinedRoom));
        },
        gameAttackEnemy(_model) {
            objRequest.putUtfString("enemyid", _model.enemyId);
            objRequest.putUtfString("bulletid", _model.bulletId);
            objRequest.putUtfString("bullettype", _model.bulletType);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("attack_enemy", objRequest, sfs.lastJoinedRoom));
        },
        gameAttackSkill(_model) {
            objRequest.putInt("skilltype", _model.skillType);
            objRequest.putUtfString("username", CurrentService.Login.username);
            //
            sfs.send(new SFS2X.ExtensionRequest("use_attack_skill", objRequest, sfs.lastJoinedRoom));
        }
        //
    })
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **