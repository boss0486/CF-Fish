window._glbLoginState = window._glbLoginState || false;
window._glbLoading = window._glbLoading || {
    connect: 0,
    login: 0,
    room: 0,
    loadIp: 0,
    device: 0
};
window._glbLogin = window._glbLogin || {
    username: "",
    displayname: "",
    avatar: 14,
    vip: 0,
    gold: 0,
    gem: 0,
};
window._glbDevice = window._glbDevice || {
    id: "",
    item: null,
    type: null,
    ip: "",
    hashKey: ""
};
window._glbNetwork = window._glbNetwork || {
    ip: "",
    countryCode: "",
    timezone: "",
};
window._glbSFxConnect = window._glbSFxConnect || {
    smartFox: null,
    state: false,
    count: 0
};
// ******************************************************************************
window._glbMenu = window._glbMenu || null;
window._glbMenuHelp = window._glbMenuHelp || null;
window._glbMenuEvent = window._glbMenuEvent || null;

window._glbMenuStore = window._glbMenuStore || null;
window._glbMenuMessage = window._glbMenuMessage || null;
window._glbMenuMailbox = window._glbMenuMailbox || null;

window._glbGame = window._glbGame || null;
window._glbGameSkill = window._glbGameSkill || {
    freezeState: false,
    tagetState: false,
    tagetTo: null,
    tagetNexPos: null,
};
// ******************************************************************************
window._fishData = window._fishData || [];
window._scence = window._scence || null;
//
export default class CurrentService {

    static Device = _glbDevice;
    static Network = _glbNetwork;
    static Loading = _glbLoading;
    static LoginState = _glbLoginState;
    static Login = _glbLogin;
    static SFxConnect = _glbSFxConnect;
    static GameSkill = _glbGameSkill;
};

window.isSoundOn = window.isSoundOn = false;
window.isMusicOn = window.isMusicOn = false;