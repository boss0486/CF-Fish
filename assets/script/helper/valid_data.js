// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



var formatUnicode = new RegExp("^[A-z]([A-z0-9-]*)+$");
var formatUser = new RegExp("^[A-z]([A-z0-9]*)+$");
var formatPin = new RegExp("^[0-9]+$");
var formatRoll = new RegExp("^([A-z0-9 -]*)+$");
var formatFName = new RegExp("^[a-zA-Z0-9 ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ|_]+$");
var formatPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
var formatEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var formatNumber = new RegExp("^(0|[1-9][0-9]*)$");
var formatNumberFloat = /^-?\d*(\.\d+)?$/;
var formatCurrency = /^[0-9 ]+(?:\.[0-9]{1,8})?$/;
var formatKeyword = new RegExp("^[a-zA-Z0-9 ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ!@#$%&*()+-?<>:,;'|_]+$");
var formatDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/u;
var formatNegative = new RegExp("^-?[0-9]+$");
//var regexNegative = new RegExp("^-?[0-9]\d*(\.\d+)?$");
var formatKeyId = /^[a-zA-Z0-9-]+$/;
var formatDateVN = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
var formatTimeWordShit = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
var formatTimeHhMm = /^([01]\d|2[0-3]):?([0-5]\d)$/;
var formatTime = /^(?:0?[0-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/;
var formatPhone = /^((\+84)|(0[2-9]|01[2|6|8|9]))+([0-9]{8,12})\b$/;
var formatTel = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
export default class ValidData {
    static validLoginName(_str) {
        if (formatUser.test(_str))
            return true;
        return false;
    };

    static validDate(_str) {
        if (formatDateVN.test(_str))
            return true;
        return false;
    };

    static validName(_str) {
        if (formatUser.test(_str))
            return true;
        return false;
    };

    static validPhoneNumber(_str) {
        if (formatPhone.test(_str))
            return true;
        return false;
    };

    static validEmail(_str) {
        if (FormatEmail.test(_str))
            return true;
        return false;
    };
}