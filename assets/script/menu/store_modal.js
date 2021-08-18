// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import CurrentService from "../helper/current";
import LibFormat from "../helper/lib_format";
// ****************************************************************
cc.Class({
    extends: cc.Component,

    properties: {
        contentBox: cc.Node,
        itemPrefab: cc.Prefab,
        scrollView: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // *******************************************  
        CurrentService.SFxConnect.smartFox.menuStore();
        this.scrollView.scrollToTop(1);
    },

    start() {

    },
    storeLoad: function(data) {
        var _this = this;
        var _heightLine = -190;
        var _width = -500;
        var count = 0;
        var space_height = 0;
        var content_height = 356;
        for (let index = 0; index < data.length; index++) {
            if (index > 0 && index % 4 == 0) {

                if (space_height > 0) {
                    _heightLine = _heightLine - 356 - 60;
                } else {
                    _heightLine = _heightLine - 356;
                }
                _width = -500;
                count = 0;
                content_height += Math.abs(-356 - 60);
            }
            if (index > 0) {
                space_height++;
            }
            var storeItem = cc.instantiate(_this.itemPrefab);
            storeItem.parent = _this.contentBox;
            storeItem.name = `item-${index}`
            storeItem.width = 250;
            storeItem.height = 356;
            storeItem.setPosition(_width + 125 + 250 * count, _heightLine);
            count++;
            // set content text 
            var item = storeItem.getComponent("store_item");
            var itemData = data[index];
            if (itemData.promote > 0) {
                item.lblPromotion.string = itemData.promote;
                item.PromotionSprite.active = true;
            }
            item.lblPrice.string = itemData.label;
            item.lblGem.string = LibFormat.formatToCurrency(itemData.price);
        }
        _this.contentBox.height = content_height + 20;
    },
    onItemSelect: function(_avatarId) {
        console.log("ok");
    }
});