// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//
var arrHelp = [1, 2, 3];
cc.Class({
    extends: cc.Component,

    properties: {
        pageView: cc.PageView
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // global for service
        _glbMenuHelp = this;
        // *******************************************
        var _this = this;
        _this.isAutoScrolling = true;
        for (let index1 = 0; index1 < arrHelp.length; index1++) {
            const _elm = arrHelp[index1];
            cc.resources.load(`fish/help/HD${_elm}`, cc.SpriteFrame, (err, asset) => {
                let nodeItem = new cc.Node(`item-${index1}`);
                _this.pageView.addPage(nodeItem);
                nodeItem.addComponent(cc.Sprite).spriteFrame = asset;
                nodeItem.width = 1000;
                nodeItem.height = 380;
                _this.pageView.indicator.node.on('click', function(event) {
                    _this.indicatorClick(_elm);
                });
            });
        }
    },
    indicatorClick(_elm) {
        console.log("ok3333333333");
        //console.log(this.pageView.getCurrentPageIndex());
    }
});