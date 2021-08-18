// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export default class LibFormat {
    static formatToCurrency(n, dp) {
        var s = '' + (Math.floor(n)),
            d = n % 1,
            i = s.length,
            r = '';
        while ((i -= 3) > 0) { r = '.' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, dp || 2)) : '');
    }
    static convertToCurrency(_val) {
        if (_val != undefined && _val != '')
            return _val.replace(/\s/g, "");

        else
            return 0;
    }
    static ZeroPadCoin(num, places = 10) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
}