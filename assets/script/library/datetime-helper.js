var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class TimeHelperService {
    //
    static getWeekDay() {
        var now = new Date();
        var day = days[now.getDay()];
        var month = months[now.getMonth()];
        return `${day}`;
        // return `${month},${day},${now.getFullYear()}`;
    };
} 

