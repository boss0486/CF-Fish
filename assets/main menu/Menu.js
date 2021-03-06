const i18n = require('i18n');
const SceneList = require('SceneList');
const TipsManager = require('TipsManager');
const SFS2X = require('sfs2x-api');

const MainScene = 'TestList.fire';
//http://localhost:7456/plugins/assets/libs/sfs2x-api/sfs2x-api-1.7.18.js.map

var sfs = null;
var objRequest = new SFS2X.SFSObject();

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
        readme: cc.ScrollView,
        btnInfo: cc.Button,
        btnBack: cc.Button,
        testList: cc.ScrollView,
        uiCamera: cc.Camera,
        sceneTitle: cc.Label,
        searchBlock: cc.Node
    },

    onConnection: function(event) {
        // Reset view 
        if (event.success) {
            sfs.send(new SFS2X.LoginRequest("aabbccddee"));
            // loading
            objRequest.putUtfString("deviceid", "aabbccddee");
            objRequest.putUtfString("client", "android");
            objRequest.putUtfString("versioncode", "ichim_android_on_iap");
            objRequest.putUtfString("gamecode", "ChimMoi");
            objRequest.putUtfString("gametype", "fish");
            objRequest.putInt("date", 3);
            objRequest.putInt("pagesize", 50);
            objRequest.putUtfString("ipAddress", "");
            objRequest.putUtfString("language", "vi");
            objRequest.putUtfString("language_code", "VietNamese");
            objRequest.putUtfString("hashKey", "vvvvvv");
            objRequest.putInt("code", 3);
            objRequest.putUtfString("tool", "cc");
        } else {
            
        }
    },

    onLogin: function(event) {
        var userVars = [];
        userVars.push(new SFS2X.SFSUserVariable("gamecode", "ChimMoi"));
        userVars.push(new SFS2X.SFSUserVariable("gametype", "fish"));
        userVars.push(new SFS2X.SFSUserVariable("language", "vi"));
        userVars.push(new SFS2X.SFSUserVariable("languagecode", "VietNamese"));
        userVars.push(new SFS2X.SFSUserVariable("deviceid", "aabbccddee"));
        userVars.push(new SFS2X.SFSUserVariable("ipAddress", ""));
        userVars.push(new SFS2X.SFSUserVariable("hashKey", "vvvvv"));
        userVars.push(new SFS2X.SFSUserVariable("date", 3));
        userVars.push(new SFS2X.SFSUserVariable("code", 3)); 
        userVars.push(new SFS2X.SFSUserVariable("branch", "ichim_android_on_iap")); 
        userVars.push(new SFS2X.SFSUserVariable("client", "android"));
        userVars.push(new SFS2X.SFSUserVariable("pagesize", 50));
        userVars.push(new SFS2X.SFSUserVariable("tool", "cc"));
        
        sfs.send(new SFS2X.SetUserVariablesRequest(userVars));
    },

    onUserVariablesUpdate: function(evtParams) {
        this.joinLobbyRoom();
    },
    
    joinLobbyRoom: function() {
        if (sfs.lastJoinedRoom == null || sfs.lastJoinedRoom.name != "lobby") {
            sfs.send(new SFS2X.JoinRoomRequest("lobby"));
        }
    },

    onExtensionResponse: function(evtParams) {
        console.log(evtParams.params)
    },

    onLoad: function () {

        var config = {
            host: "14.177.238.221",
            port: 8088,
            zone: "ChimMoi",
            debug: false
        };

        sfs = new SFS2X.SmartFox(config);

        sfs.logger.level = SFS2X.LogLevel.DEBUG;
        // Add event listeners
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);
        sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this.onUserVariablesUpdate, this);
        sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this.onExtensionResponse, this);

        sfs.connect();

        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = MainScene;
        this.contentPos = null;
        this.btnBack.node.active = false;
        this.loadInstruction(this.currentSceneUrl);

        this.storage = this.node.getComponent('StorageUtil');
        // keep the search scene list res
        cc.game.addPersistRootNode(this.searchBlock);
        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
            // in main scene
            this.sceneList = this.testList.content.getComponent(SceneList);
            this.sceneList.init(this);
        }
        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CAEvent.onEvent({
                eventName: "????????????"
            });
        }

        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);

        let url = this.storage.getCurrentScene();
        if (url) {
            this.loadScene(url);
        }
    },

    _onSceneLaunched() {
        let cameras = cc.Camera.cameras;
        for (let i = 0, l = cameras.length; i < l; i++) {
            let camera = cameras[i];
            if (camera === this.uiCamera) {
                camera.cullingMask = 1 << this.node.groupIndex;
            }
            else {
                camera.cullingMask = camera.cullingMask & (~(1 << this.node.groupIndex));
            }
        }
    },

    backToList: function () {
        this.loadScene(MainScene);
    },

    loadScene: function (url) {
        if (this._isLoadingScene) {
            return;
        }

        let result = cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
        if (!result) {
            this.storage.setCurrentScene('');
            return;
        }

        this._isLoadingScene = true;

        this.showReadme(null, false);
        this.contentPos = this.testList.getContentPosition();

        this.currentSceneUrl = url;


        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CALevels.begin({
                level: url
            });
        }
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
        // record the last close scene 
        this.storage.setCurrentScene(url);

        this.testList.node.active = false;

        let isMenu = url.endsWith(MainScene);
        this.btnBack.node.active = this.sceneTitle.node.active = !isMenu;
        this.testList.node.active = isMenu;
        if (isMenu) {
            if (this.contentPos) {
                this.testList.setContentPosition(this.contentPos);
            }
        }
        else {
            this.sceneTitle.string = url.replace('db://assets/cases/', '');
        }

        this._isLoadingScene = false;
    },

    _getAdjacentScenes() {
        let res = { next: '', prev: '' };
        let sceneList = this.sceneList.sceneList;

        function findAvailableScene(startIndex, step) {
            for (var i = startIndex; 0 <= i && i < sceneList.length; i += step) {
                let url = sceneList[i].url;
                if (url) {
                    let sceneName = cc.path.basename(url, '.fire');
                    let available = TipsManager.hasSupport(sceneName, true);
                    if (available) {
                        return url;
                    }
                }
            }
            return MainScene;
        }

        if (this.currentSceneUrl.endsWith(MainScene)) {
            res.next = findAvailableScene(0, 1);
            res.prev = findAvailableScene(sceneList.length - 1, -1);
        }
        else {
            // findIndex
            let i = -1;
            sceneList.some((item, index) => {
                if (item.url === this.currentSceneUrl) {
                    i = index;
                    return true;
                }
                return false;
            });

            if (i !== -1) {
                res.next = findAvailableScene(i + 1, 1);
                res.prev = findAvailableScene(i - 1, -1);
            }
        }
        return res;
    },

    nextScene() {
        let { next } = this._getAdjacentScenes();
        if (next) {
            this.loadScene(next);
        }
    },

    prevScene() {
        let { prev } = this._getAdjacentScenes();
        if (prev) {
            this.loadScene(prev);
        }
    },

    loadInstruction: function (url) {
        let self = this;
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.resources.load('readme/' + fileName, cc.TextAsset, function (err, asset) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = asset.text;
        });
    },

    showReadme: function (event, active) {
        if (active === undefined) {
            active = !this.readme.node.active;
        }

        this.readme.node.active = active;
        if (active) {
            this.readme.scrollToTop();
        }

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh????????? Collider DebugDraw ????????????????????????????????????
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.node.active) {
            this.showDebugDraw = enabledDebugDraw;
            cc.director.getCollisionManager().enabledDebugDraw = false;
        }
        else {
            cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        }

        // en: fix Video Player always displayed on top of the problem.
        // zh????????? Video Player ????????????????????????????????????
        var videoPlayer = cc.find('Canvas/VideoPlayer');
        if (videoPlayer) {
            videoPlayer.active = !this.readme.node.active;
        }
    },

    restart() {
        cc.game.restart();
    },

    gc() {
        cc.sys.garbageCollect();
    },
});
