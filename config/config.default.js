/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1649433120953_6347';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    /** 更改默认的启动端口 */
    config.cluster = {
        listen: {
            port: 2766,
        },
    };

    config.security = {
        domainWhiteList: [ 'http://localhost:8080', 'http://127.0.0.1:7001' ],
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
            headerName: 'token',
            // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};
