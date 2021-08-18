// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CurrentService from "../helper/current";
import NotificationService from "../helper/notification";
import HelperService from "../helper/help_service";
// ****************************************************************
var mailContext = [];
cc.Class({
    extends: cc.Component,

    properties: {
        mailList: cc.Node,
        mailItemPrefab: cc.Prefab,
        mailContent: cc.RichText,
        scrollView: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // global for service
        _glbMenuMailbox = this;
        // ******************************************* 
        CurrentService.SFxConnect.smartFox.menuMailbox();
        this.scrollView.scrollToTop(1);
    },
    mailLoad(result) {
        mailData = result;
        if (result.length > 0) {
            var _this = this;
            var ydefautl = -30;
            var heightContent = 0;

            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                mailContext.push(element.content);
                var _index = index + 1
                if (index + 1 < 10)
                    _index = `0${_index}`;
                //
                var mailItem = cc.instantiate(_this.mailItemPrefab);
                var item = mailItem.getComponent("mail_list_item");
                item.lblTitle.string = `${_index}. ${element.title}`;
                item.lblDate.string = `${element.datecreate.split(' ')[0]}`;
                item.lblContent.string = `${element.content}`;
                mailItem.name = `mail${index}`;
                mailItem.parent = _this.mailList;
                mailItem.y = ydefautl - ((mailItem.height + 20) * index);
                heightContent += mailItem.height + 20;
                // event
                mailItem.on(cc.Node.EventType.TOUCH_START, function() {
                    this.mailContent.string = "";
                    this.mailContent.string = element.content;
                }, this);
            }
            //content
            this.mailContent.string = `${result[0].content}`;
            this.mailList.height = heightContent + 15;
        }
    },
});