'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        console.log(ctx.request.body);
        const params = ctx.request.body;
        const body = {
            code: 0,
            data: {},
        };
        if (params.needName) {
            body.data.name = 'jimous';
        }
        if (params.needAge) {
            body.data.age = 26;
        }
        ctx.body = JSON.stringify(body);
    }
}

module.exports = UserController;
