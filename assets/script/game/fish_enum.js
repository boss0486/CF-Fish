// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// 定义一个接口，用来对应json配置文件转成对象

export default class FishEmun {
    FishType = {
        name: "",
        hp: 0,
        gold: 0
    };
    FishState = {
        alive: 1,
        dead: 0
    };
}

