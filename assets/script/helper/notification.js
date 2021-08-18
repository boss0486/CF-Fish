var cpnant;
export default class Notification {
    static ShowMessage(_title = "Thông báo", _message) {
        var _dialog = cc.find("popupDialog");
        var cpnTitle = _dialog.getChildByName("Dialog").getChildByName("TitleLabel");
        var cpnContent = _dialog.getChildByName("Dialog").getChildByName("Content");
        cpnTitle.getComponent(cc.Label).string = _title;
        cpnContent.getComponent(cc.RichText).string = _message;
        // //
        _dialog.active = true;
        return;
    };
    static ShowMessageEx(model) {
        var _dialog = cc.find("popupDialog");
        var _title = model.title;
        var _message = model.message;
        //
        var cpnTitle = _dialog.getChildByName("Dialog").getChildByName("TitleLabel");
        var cpnContent = _dialog.getChildByName("Dialog").getChildByName("Content");
        cpnTitle.getComponent(cc.Label).string = _title;
        cpnContent.getComponent(cc.RichText).string = _message;
        //
        _dialog.active = true;
        return;
    };

};