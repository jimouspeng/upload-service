/*
 * @Author: jimouspeng
 * @Date: 2022-04-07 11:36:02
 * @Description: 框架会默认挂载到 ctx.service 上，对应的 Key 为文件名的驼峰格式
 * @FilePath: \upload-service\app\service\user.js
 */

'use strict';

const { Service } = require('egg');

class UserService extends Service {
    find(uid) {
        return '999' + uid;
    }
}

module.exports = UserService;
