// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import _menu from "./menu";
import CurrentService from "../helper/current";
import LibData from "../helper/lib_data";
import ValidData from "../helper/valid_data";
import Notification from "../helper/notification";
//
var arrAvatar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
cc.Class({
    extends: cc.Component,

    properties: {
        avatarBox: cc.Node,
        scrollView: cc.ScrollView,
        avatar: cc.Sprite,
        displayName: cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var _this = this;
        if (CurrentService.LoginState) {
            if (CurrentService.Login != null) {
                var _avatarId = CurrentService.Login.avatar;
                if (_avatarId < 1 || _avatarId > 20)
                    _avatarId = 14;
                //  
                cc.resources.load(`fish/avatar/${_avatarId}`, cc.SpriteFrame, (err, asset) => {
                    _this.avatar.getComponent(cc.Sprite).spriteFrame = asset;
                });
                // 
                _this.displayName.string = CurrentService.Login.displayname;
            }
        }
        this.scrollView.scrollToTop(0.1);

        var dataGroup = LibData.chunkArray(arrAvatar, 3);
        for (let index = 0; index < dataGroup.length; index++) {
            var _arrLine = dataGroup[index];
            for (let index1 = 0; index1 < _arrLine.length; index1++) {
                const _elm = _arrLine[index1];

                cc.resources.load(`fish/lobby/_0012_avatar`, cc.SpriteFrame, (err, asset) => {
                    var elmIndex = parseInt(_elm);
                    let nodeItem = new cc.Node(`item-${elmIndex}`);
                    nodeItem.addComponent(cc.Sprite).spriteFrame = asset;
                    nodeItem.parent = _this.avatarBox;
                    nodeItem.width = 108;
                    nodeItem.height = 111;
                    var tt1 = 140 * index1;
                    var _height = 430 - 130 * index;
                    nodeItem.setPosition(-220 + tt1, _height);
                    //
                    cc.resources.load(`fish/avatar/${parseInt(_elm)}`, cc.SpriteFrame, (err, asset1) => {
                        var nodeImg = new cc.Node(`img-${_elm}`);
                        nodeImg.id = _elm;
                        nodeImg.addComponent(cc.Sprite).spriteFrame = asset1;
                        nodeImg.addComponent(cc.Button);
                        //var widget = nodeImg.addComponent(cc.Widget);
                        nodeImg.parent = nodeItem;
                        nodeImg.width = 108;
                        nodeImg.height = 111;
                        nodeImg.scale = 0.92;
                        nodeImg.y = 1.5;
                        // 
                        nodeImg.on('click', function(event) {
                            _this.onAvatarItemSelect(_elm);
                        });
                    });
                });
            }
        }
    },

    start() {

    },
    // update (dt) {},
    onPlay: function() {
        cc.director.loadScene("Game");
    },
    onInfoSave: function() {
        if (this.displayName.string == "") {
            Notification.ShowMessage("Thông báo", "Nhập tên hiển thị");
            return;
        }
        if (!ValidData.validName(this.displayName.string)) {
            Notification.ShowMessage("Thông báo", "Tên hiển thị không hợp lệ");
            return;
        }
        //
        if (this.avatar.getComponent(cc.Sprite)._spriteFrame.name == undefined) {
            Notification.ShowMessage("Thông báo", "Ảnh đại diện không hợp lệ0");
            return;
        }
        var avatarId = this.avatar.getComponent(cc.Sprite)._spriteFrame.name;
        if (!arrAvatar.includes(parseInt(avatarId))) {
            Notification.ShowMessage("Thông báo", "Ảnh đại diện không hợp lệ1");
            return;
        }
        //
        CurrentService.SFxConnect.smartFox.userProfileChange({
            displayName: this.displayName.string,
            avatar: parseInt(avatarId)
        });
    },
    onAvatarItemSelect: function(_avatarId) {
        if (_avatarId == undefined || _avatarId == null) return;
        cc.resources.load(`fish/avatar/${_avatarId}`, cc.SpriteFrame, (err, asset) => {
            this.avatar.getComponent(cc.Sprite).spriteFrame = asset;
        });
    }
});