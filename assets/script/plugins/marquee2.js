// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.RichText,
        maskNode: cc.Mask,
        m_speed: cc.Integer = 100,
        m_direction: cc.Integer = 2, // 1:left to right, 2:right to left,
        m_xLeftEnd: cc.Integer = 0,
        m_xRightEnd: cc.Integer = 0,
        m_yPos: cc.Integer = 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        // init logic

        this.label.string = "我是第一条信息 我是第二条信息 我是第一条信息 我是第二条信息 我是第一条信息 我是第二条信息 我是第一条信息 我是第二条信息";
        this.m_xRightEnd = this.node.x + this.maskNode.node.width * this.maskNode.node.anchorX;
        this.m_xLeftEnd = this.node.x - this.maskNode.node.width * this.maskNode.node.anchorX;

        let contentSize = this.label.node.getContentSize();

        let xPos = 0;
        if (this.m_direction === 1) {
            xPos = this.m_xLeftEnd - contentSize.width;
        } else {
            xPos = this.m_xRightEnd;
        }

        this.label.x = xPos;
        this.label.y = this.m_yPos;

    },

    update(dt) {
        //cc.log("dt:" + dt);
        if (this.m_direction === 2) {
            let contentSize = this.label.node.getContentSize();
            if (this.label.node.x >= this.m_xRightEnd) {
                this.label.node.x = this.m_xLeftEnd - contentSize.width;
            }

            this.label.node.x += this.m_speed * dt;

        } else {
            let contentSize = this.label.getContentSize();
            if (this.label.node.x <= this.m_xLeftEnd - contentSize.width) {
                this.label.node.x = this.m_xRightEnd;
            }

            this.label.node.x -= this.m_speed * dt;
        }
    },
});