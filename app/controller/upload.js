'use strict';
const Controller = require('egg').Controller;
const { Buffer } = require('buffer');
const fs = require('fs');

class UploadController extends Controller {
    async index() {
        const { ctx } = this;
        const fileStream = await ctx.getFileStream();
        let fileBuff = Buffer.alloc(0);
        fileStream.on('data', chunk => {
            console.log(chunk);
            fileBuff = Buffer.concat([ fileBuff, chunk ]);
        });
        fileStream.on('end', () => {
            const filePath = `${this.app.baseDir}/images/${fileStream.filename}`;
            console.log(filePath);
            const createFileStream = fs.createWriteStream(filePath);
            console.log(fileBuff.byteLength, '看看');
            createFileStream.write(fileBuff);
            ctx.body = 'hi, egg';
        });
    }
}

module.exports = UploadController;
