// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export default class HelperService {
    static autoFixScreen() {
        // // Giải pháp điều chỉnh 
        // let _canvas = cc.Canvas.instance;
        // // Tỷ lệ độ phân giải thiết kế 
        // let _rateR = _canvas.designResolution.height / _canvas.designResolution.width;
        // // Hiển thị tỷ lệ độ phân giải 
        // let _rateV = cc.winSize.height / cc.winSize.width;
        // console.log("winSize: rateR:" + _rateR + "rateV:" + _rateV);
        // if (_rateV > _rateR) {
        //     _canvas.fitHeight = false;
        //     _canvas.fitWidth = true;
        // } else {
        //     _canvas.fitHeight = true;
        //     _canvas.fitWidth = false;
        // }

        // var canvas = cc.Canvas.instance.designResolution;
        // var scWidth = cc.view.getCanvasSize().width;
        // var scHeight = cc.view.getCanvasSize().height;
        // //
        // if (canvas != null) {
        //     let srcScaleForShowAll = Math.min(scWidth / canvas.width, scHeight / canvas.height);
        //     let realWidth = canvas.width * srcScaleForShowAll;
        //     let realHeight = canvas.height * srcScaleForShowAll;
        //     //cc.renderContext.scale(realWidth, realHeight);
        //     // 2. 基于第一步的数据，再做节点宽高适配
        //     var width = canvas.width * (scWidth / realWidth);
        //     var height = canvas.height * (scHeight / realHeight);
        //     cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_HEIGHT);
        // }



    }

};

// window.addEventListener("resize", function(event) {
//     selfPointer.adjustSizeForWindow();
// });