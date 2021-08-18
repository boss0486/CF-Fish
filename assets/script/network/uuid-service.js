var runtime = require("runtime");
import DeviceUUIDService from "device-uuid";
import CurrentService from "../helper/current";

import HashService from "../library/hash";
//
export default class UuidService {
    // 
    static async getNetwork() {
        return "118.70.171.44";
        // var xhr = new XMLHttpRequest;
        // xhr.open("GET", 'http://ip-api.com/json', true);
        // xhr.responseType = 'json';
        // xhr.onreadystatechange = async function(err, tex) {
        //     if (callback && xhr.response != null) await callback(xhr.response);
        // };
        // xhr.send(null);
        // //
        // var result = null;
        // var request = cc.loader.getXMLHttpRequest();
        // request.open("GET", "http://ip-api.com/json", true);
        // request.responseType = 'json';
        // request.onreadystatechange = function(err, tex) {
        //     result = request.statusText;
        // };
        // await request.send(null);
        // console.log(result)
        // return request;
    }

    // var rs = null;
    // await cc.assetManager.loadAny({ url: 'http://ip-api.com/json' }, async(err, img) => {
    //     rs = await img
    //     console.log(rs);
    // });
    // console.log(rs);
    // return rs;
    //cc.assetManager.loadAny({ url: 'http://ip-api.com/json', skin: 'xxx', model: 'xxx', userName: 'xxx', password: 'xxx' });
    // cc.assetManager.loadRemote("http://ip-api.com/json", 'json', (err, response) => {
    //     console.log(response);
    //     _glbNetwork = {
    //         ip: "",
    //         countryCode: "",
    //         timezone: "",
    //     }
    // });


    static async fetchApiIP(url) {
        var rs = null;

        // var result = null;
        // var request = cc.loader.getXMLHttpRequest();
        // request.open("GET", url, true);
        // request.responseType = 'json';
        // request.onreadystatechange = function(err, tex) {

        //     result = request.statusText;
        // };
        // await request.send(null);
        // console.log(result)
        // return request;

    }
    static async getDevice() {
        var device = new DeviceUUIDService();

        var driverList = ["d520c7a8-421b-4563-b955-f5abc56b97ec",
            "d520c7a8-421b-4563-b955-f5abc56b97e1",
            "d520c7a8-421b-4563-b955-f5abc56b97e2",
            "d520c7a8-421b-4563-b955-f5abc56b97e3",
            "d520c7a8-421b-4563-b955-f5abc56b97e4",
            "d520c7a8-421b-4563-b955-f5abc56b97e5",
            "d520c7a8-421b-4563-b955-f5abc56b97e6",
            "d520c7a8-421b-4563-b955-f5abc56b97e7",
            "d520c7a8-421b-4563-b955-f5abc56b97e8",
            "d520c7a8-421b-4563-b955-f5abc56b97e9",
            "d520c7a8-421b-4563-b955-f5abc56b97e10",
            "d520c7a8-421b-4563-b955-f5abc56b97e11"
        ];
        var random = Math.floor(Math.random() * 10) + 1;
        console.log(random);
        var deviceId = driverList[random];
        //var deviceId = await device.get();
        var du = await device.parse();
        return {
            id: deviceId,
            item: await device.parse(),
            type: {
                language: du.language.substring(0, 2),
                platform: du.platform,
                os: du.os,
                cpuCores: du.cpuCores,
                isAuthoritative: du.isAuthoritative,
                silkAccelerated: du.silkAccelerated,
                isKindleFire: du.isKindleFire,
                isDesktop: du.isDesktop,
                isMobile: du.isMobile,
                isTablet: du.isTablet,
                isWindows: du.isWindows,
                isLinux: du.isLinux,
                isLinux64: du.isLinux64,
                isMac: du.isMac,
                isiPad: du.isiPad,
                isiPhone: du.isiPhone,
                isiPod: du.isiPod,
                isSmartTV: du.isSmartTV,
                pixelDepth: du.pixelDepth,
                isTouchScreen: du.isTouchScreen
            },
            hashKey: HashService.hashMD5(deviceId),
        };
    };
    //
    static getDeviceName(duType) {
        var result = "";
        return "android";
        switch (duType) {
            case duType.isDesktop:
                result = "webgl";
                break;
            case duType.isAndroid:
                result = "android";
                break;
            case duType.isMobile:
                result = "ios";
                break;
            default:
                result = "webgl";
                break;
        }
        return result;
    }
}