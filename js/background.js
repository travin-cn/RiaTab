chrome.runtime.onInstalled.addListener(() => {
    // 清空所有本地存储，在调试期使用
    // window.localStorage.clear();

    // 初始化搜索引擎,并加载到本地
    let engineList = [
        { name: "百度", link: "https://www.baidu.com/s?wd=" },
        { name: "谷歌", link: "https://www.google.com/search?q=" },
        { name: "magi", link: "https://magi.com/search?q=" },
    ]

    let jsonEngineList = JSON.stringify(engineList);
    window.localStorage.setItem('engines', jsonEngineList);


    // 初始化应用,并加载到本地
    let appList = [
        { name: "哔哩", link: "https://www.bilibili.com/" },
        { name: "虎牙", link: "https://www.huya.com/" },
        { name: "云盘", link: "https://pan.baidu.com/" },
        { name: "3DM", link: "https://www.3dmgame.com/" },
        { name: "邮箱", link: "https://mail.qq.com/" },
    ]

    let jsonAppList = JSON.stringify(appList);
    window.localStorage.setItem('apps', jsonAppList);

});