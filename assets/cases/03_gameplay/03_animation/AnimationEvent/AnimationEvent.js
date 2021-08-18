cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
        this._animCtrl = this.node.getComponent(cc.Animation);
    },
    onNextAnimation: function(step) {
        this._animCtrl.play("step_" + step);
    }
});