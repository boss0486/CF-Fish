//
export default class HelperData {
    static convertMapEntries_ToObject(_param) {
        var obj = null;
        Object.entries(_param).map((key, value) => {
            if (value === 0) {
                obj = Object.fromEntries(key[1]);
                Object.entries(obj).forEach(v => obj[v[0]] = obj[v[0]].value);
            }
        });
        // const obj = Object.fromEntries(_param);
        // Object.entries(obj).forEach(v => obj[v[0]] = obj[v[0]].value);
        return obj;
    };
    static convertMapEntries_ToObject2(_param) {
        // var obj = null;
        // Object.entries(_param).map((key, value) => {
        //     if (value === 0) {
        //         obj = Object.fromEntries(key[1]);
        //         Object.entries(obj).forEach(v => obj[v[0]] = obj[v[0]].value);
        //     }
        // });
        const obj = Object.fromEntries(_param);
        Object.entries(obj).forEach(v => obj[v[0]] = obj[v[0]].value);
        return obj;
    }
    static convertArrayToObject = (array, key) => {
        return {...array };
    };
    static readMessage = (array, key) => {
        var arrMessage = [];
        array.forEach(element => {
            var item = HelperData.convertMapEntries_ToObject(element.value);
            arrMessage.push(item);
        });
        return arrMessage;
    };
};