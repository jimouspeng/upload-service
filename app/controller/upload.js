'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = UploadController;
